import asyncio
import time
from contextlib import suppress
from collections import defaultdict
from fastapi import FastAPI, APIRouter, Request, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import DESCENDING, IndexModel
from bson import ObjectId
import os
import logging
from html import escape
from pathlib import Path
from typing import Annotated, Literal, Optional
from pydantic import BaseModel, BeforeValidator, ConfigDict, EmailStr, Field
from datetime import datetime, timezone

from email_service import send_email

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

client = AsyncIOMotorClient(os.environ['MONGO_URL'])
db = client[os.environ['DB_NAME']]
OWNER_EMAIL = os.environ['OWNER_EMAIL']
logger = logging.getLogger(__name__)

INDEXES: dict[str, list[IndexModel]] = {
    "contact_requests": [IndexModel([("created_at", DESCENDING)], name="created_at_desc")],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logger.error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)


PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if isinstance(v, ObjectId) else v)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        data = self.model_dump(by_alias=True, exclude={"id"})
        if self.id:
            data["_id"] = ObjectId(self.id)
        return data

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls.model_validate(doc)


Topic = Literal["product", "labels", "shims", "other"]


class ContactIn(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    topic: Topic = "product"
    message: str = Field(min_length=10, max_length=2000)
    lang: Literal["it", "en"] = "it"
    website: str = ""  # honeypot


class ContactRequest(BaseDocument):
    name: str
    email: str
    topic: Topic
    message: str
    lang: str
    email_sent: bool = False
    created_at: str


TOPIC_LABELS = {"product": "Informazioni prodotto", "labels": "Label personalizzate",
                "shims": "Spessori su misura", "other": "Altro"}

_hits: dict[str, list[float]] = defaultdict(list)


def _rate_limited(ip: str, limit: int = 5, window: int = 600) -> bool:
    now = time.time()
    _hits[ip] = [t for t in _hits[ip] if now - t < window]
    if len(_hits[ip]) >= limit:
        return True
    _hits[ip].append(now)
    return False


def _owner_email_html(req: ContactRequest) -> str:
    msg = escape(req.message).replace("\n", "<br>")
    return (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#0B1320">'
        '<h2 style="margin:0 0 16px">Nuova richiesta dal sito Slabsy</h2>'
        f'<p><strong>Nome:</strong> {escape(req.name)}<br>'
        f'<strong>Email:</strong> {escape(req.email)}<br>'
        f'<strong>Argomento:</strong> {escape(TOPIC_LABELS[req.topic])}<br>'
        f'<strong>Lingua:</strong> {escape(req.lang.upper())}</p>'
        f'<p style="padding:16px;background:#F3EEE4;border-left:3px solid #C9A45C">{msg}</p>'
        '<p style="font-size:12px;color:#666">Notifica automatica inviata da Slabsy. '
        'Rispondi direttamente all\'indirizzo email del cliente indicato sopra.</p>'
        '</td></tr></table>'
    )


app = FastAPI()
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"message": "Slabsy API"}


@api_router.post("/contact")
async def create_contact(payload: ContactIn, request: Request):
    if payload.website:
        return {"ok": True}
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "?").split(",")[0]
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many requests")
    req = ContactRequest(name=payload.name.strip(), email=payload.email, topic=payload.topic,
                         message=payload.message.strip(), lang=payload.lang,
                         created_at=datetime.now(timezone.utc).isoformat())
    result = await db.contact_requests.insert_one(req.to_mongo())
    req.id = str(result.inserted_id)
    try:
        await send_email(to=OWNER_EMAIL, subject=f"Slabsy · Nuova richiesta da {req.name}",
                         html=_owner_email_html(req))
        req.email_sent = True
        await db.contact_requests.update_one({"_id": result.inserted_id}, {"$set": {"email_sent": True}})
    except HTTPException as exc:
        logger.warning("Contact saved but email not sent: %s", exc.detail)
    return {"ok": True, "id": req.id, "email_sent": req.email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())


@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()
