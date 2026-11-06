import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { EMAIL, PHONE, PHONE_HREF } from "@/data/site";
import { Seo } from "@/components/site/Seo";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { EtsyButton } from "@/components/site/EtsyButton";
import { SEO } from "@/data/seo";

const API = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api` : null;
const TOPICS = [
  ["product", { it: "Informazioni prodotto", en: "Product information" }],
  ["labels", { it: "Label personalizzate", en: "Custom labels" }],
  ["shims", { it: "Spessori su misura", en: "Custom shims" }],
  ["other", { it: "Altro", en: "Other" }],
];
const EMPTY = { name: "", email: "", topic: "product", message: "", website: "" };
const field = "w-full rounded-2xl border border-[var(--line)] bg-[var(--ink-2)] px-5 py-4 text-[var(--paper)] placeholder:text-[#8d97a8] outline-none transition-[border-color,box-shadow] duration-300 focus:border-[var(--gold)] focus:shadow-[0_0_0_4px_rgba(201,164,92,0.15)]";

const ContactForm = () => {
  const { t, lang } = useT();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!API) { toast.error(t({ it: "Modulo non disponibile: scrivici a ", en: "Form unavailable: email us at " }) + EMAIL); return; }
    setStatus("loading");
    try {
      await axios.post(`${API}/contact`, { ...form, lang });
      setStatus("done");
      setForm(EMPTY);
    } catch (err) {
      setStatus("idle");
      const s = err?.response?.status;
      toast.error(s === 429 ? t({ it: "Troppe richieste, riprova tra qualche minuto.", en: "Too many requests, try again in a few minutes." }) : t({ it: "Controlla i campi e riprova.", en: "Please check the fields and try again." }));
    }
  };

  if (status === "done") {
    return (
      <div data-testid="contact-success" className="rounded-3xl border border-[rgba(201,164,92,0.5)] bg-[var(--ink-2)] p-10">
        <CheckCircle2 className="text-[var(--gold)]" size={36} />
        <h2 className="font-display mt-6 text-4xl font-extrabold uppercase leading-none">{t({ it: "Messaggio ricevuto.", en: "Message received." })}</h2>
        <p className="mt-4 text-[#c9cfd9]">{t({ it: "Grazie! Ti risponderemo al più presto all'indirizzo email indicato.", en: "Thank you! We'll reply soon to the email address you provided." })}</p>
        <button onClick={() => setStatus("idle")} data-testid="contact-new-message" className="btn-ghost mt-8 rounded-full px-5 py-3 text-sm">{t({ it: "Invia un altro messaggio", en: "Send another message" })}</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-testid="contact-form" className="grid gap-4 sm:grid-cols-2">
      <input data-testid="contact-name-input" required minLength={2} maxLength={80} value={form.name} onChange={set("name")} placeholder={t({ it: "Nome e cognome", en: "Full name" })} className={field} aria-label="Nome" />
      <input data-testid="contact-email-input" required type="email" value={form.email} onChange={set("email")} placeholder="Email" className={field} aria-label="Email" />
      <select data-testid="contact-topic-select" value={form.topic} onChange={set("topic")} className={`${field} sm:col-span-2`} aria-label={t({ it: "Argomento", en: "Topic" })}>
        {TOPICS.map(([v, l]) => <option key={v} value={v}>{t(l)}</option>)}
      </select>
      <textarea data-testid="contact-message-input" required minLength={10} maxLength={2000} rows={6} value={form.message} onChange={set("message")} placeholder={t({ it: "Raccontaci la tua collezione, il formato delle slab o la label che hai in mente…", en: "Tell us about your collection, your slab formats or the label you have in mind…" })} className={`${field} resize-none sm:col-span-2`} aria-label="Messaggio" />
      <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
        <p className="text-xs text-[var(--muted)]">{t({ it: "Usiamo i tuoi dati solo per rispondere alla richiesta.", en: "We only use your data to reply to your request." })}</p>
        <button type="submit" disabled={status === "loading"} data-testid="contact-submit-button" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-4 font-semibold disabled:opacity-70">
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}{t({ it: "Invia richiesta", en: "Send request" })}
        </button>
      </div>
    </form>
  );
};

export default function Contact() {
  const { t } = useT();
  return (
    <>
      <Seo title={t(SEO.contact.title)} description={t(SEO.contact.desc)} />
      <PageHero testid="contact-hero" over={t({ it: "Contatti", en: "Contact" })} lines={t({ it: ["Parliamo della", "tua collezione."], en: ["Let's talk about", "your collection."] })} />
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 pb-28 sm:px-8 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-7"><ContactForm /></Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <div className="space-y-8">
            <a href={`mailto:${EMAIL}`} data-testid="contact-email-link" className="group flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--line)] transition-colors duration-300 group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]"><Mail size={20} /></span>
              <span><span className="block font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Email</span><span className="font-display text-2xl font-bold">{EMAIL}</span></span>
            </a>
            <a href={PHONE_HREF} data-testid="contact-phone-link" className="group flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--line)] transition-colors duration-300 group-hover:bg-[var(--gold)] group-hover:text-[var(--ink)]"><Phone size={20} /></span>
              <span><span className="block font-mono text-xs uppercase tracking-widest text-[var(--muted)]">{t({ it: "Telefono", en: "Phone" })}</span><span className="font-display text-2xl font-bold">{PHONE}</span></span>
            </a>
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--ink-2)] p-7">
              <p className="overline">Shop</p>
              <p className="mt-3 text-[#c9cfd9]">{t({ it: "La vendita dei prodotti Slabsy avviene su Etsy.", en: "Slabsy products are sold on Etsy." })}</p>
              <div className="mt-6"><EtsyButton testid="contact-etsy-button" /></div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
