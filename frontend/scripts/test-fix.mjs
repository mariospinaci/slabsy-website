// Post-build for the test export: a static copy that lives in a subfolder of a classic PHP hosting (e.g. /test),
// not indexable, with a PHP contact endpoint and a one-time password setup page.
import { readdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const base = process.env.PUBLIC_URL;
const out = join(here, "..", process.env.BUILD_PATH);
const { EMAIL } = await import(pathToFileURL(join(here, "..", "src/data/site.js")).href);

const jsDir = join(out, "static", "js");
for (const f of readdirSync(jsDir).filter((x) => x.endsWith(".js"))) {
  const p = join(jsDir, f);
  writeFileSync(p, "/* eslint-disable */\n" + readFileSync(p, "utf8").replace(/(["'`])\/img\//g, `$1${base}/img/`));
}

const index = join(out, "index.html");
writeFileSync(index, readFileSync(index, "utf8").replace("<head>", '<head><meta name="robots" content="noindex, nofollow, noarchive"/>'));
for (const f of ["robots.txt", "sitemap.xml", "llms.txt"]) rmSync(join(out, f), { force: true });

const asset = (f) => readFileSync(join(here, "test-site", f), "utf8").replaceAll("__BASE__", base).replaceAll("__EMAIL__", EMAIL);
writeFileSync(join(out, ".htaccess"), asset("htaccess.txt"));
writeFileSync(join(out, "contatti.php"), asset("contatti.php"));
writeFileSync(join(out, "attiva-password.php"), asset("attiva-password.php"));
writeFileSync(
  join(out, "LEGGIMI.txt"),
  `SLABSY - versione di test per www.slabsy.it${base}/

1. Carica via FTP TUTTO il contenuto di questa cartella dentro la cartella "${base.slice(1)}" del sito.
   Attenzione: il file ".htaccess" e' nascosto su alcuni computer, assicurati che venga caricato.
2. Apri nel browser  https://www.slabsy.it${base}/attiva-password.php
   La protezione si attiva subito e il file si cancella da solo.
3. Apri  https://www.slabsy.it${base}/  : il browser chiede nome utente (slabsy) e password.

Se dopo il punto 2 il sito mostra "Errore 500": ricarica via FTP il file ".htaccess" di questa cartella
(torna tutto visibile, senza password) e segnalalo.

Il sito non viene indicizzato dai motori di ricerca (noindex) e non contiene sitemap.
Il modulo contatti invia l'email a ${EMAIL} tramite il file "contatti.php".
`,
);
console.log("test export ready:", out);
