// Post-build for the offline export: makes image paths relative so index.html works from a double-click (file://)
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "offline");
const jsDir = join(out, "static", "js");
for (const f of readdirSync(jsDir).filter((x) => x.endsWith(".js"))) {
  const p = join(jsDir, f);
  writeFileSync(p, "/* eslint-disable */\n" + readFileSync(p, "utf8").replace(/(["'`])\/img\//g, "$1./img/"));
}
writeFileSync(
  join(out, "LEGGIMI.txt"),
  "SLABSY - versione offline\n\nFai doppio clic su index.html per aprire il sito nel browser.\nServe una connessione internet solo per i caratteri tipografici (senza connessione il sito funziona con caratteri di sistema).\nIl modulo contatti e' sostituito da pulsanti email e telefono.\n",
);
console.log("offline export ready:", out);
