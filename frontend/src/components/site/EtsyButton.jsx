import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useT } from "@/lib/i18n";
import { ETSY_URL, EMAIL } from "@/data/site";

const COPY = {
  label: { it: "Acquista su Etsy", en: "Buy on Etsy" },
  title: { it: "Lo shop Etsy apre a breve", en: "Our Etsy shop opens soon" },
  body: { it: "Stiamo preparando lo shop ufficiale Slabsy su Etsy. Nel frattempo scrivici: ti rispondiamo con disponibilità e tempi.", en: "We're preparing the official Slabsy shop on Etsy. Meanwhile, write to us: we'll reply with availability and timing." },
  cta: { it: "Scrivici", en: "Contact us" },
};

export const EtsyButton = ({ size = "md", testid = "etsy-button", label }) => {
  const { t, p } = useT();
  const [open, setOpen] = useState(false);
  const cls = `btn-gold inline-flex items-center gap-2 rounded-full font-semibold ${size === "sm" ? "px-4 py-2 text-sm" : "px-6 py-3.5 text-base"}`;
  const text = label || t(COPY.label);
  if (ETSY_URL) {
    return <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" data-testid={testid} className={cls}>{text}<ArrowUpRight size={16} /></a>;
  }
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} data-testid={testid} className={cls}>{text}<ArrowUpRight size={16} /></button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-testid="etsy-coming-soon-dialog" className="border-[var(--line)] bg-[var(--ink-2)] text-[var(--paper)]">
          <DialogHeader>
            <p className="overline">Etsy</p>
            <DialogTitle className="font-display text-3xl font-extrabold uppercase">{t(COPY.title)}</DialogTitle>
            <DialogDescription className="text-[var(--muted)]">{t(COPY.body)}</DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link to={p("contact")} onClick={() => setOpen(false)} data-testid="etsy-dialog-contact-link" className="btn-gold rounded-full px-5 py-3 text-sm font-semibold">{t(COPY.cta)}</Link>
            <a href={`mailto:${EMAIL}`} data-testid="etsy-dialog-email-link" className="btn-ghost rounded-full px-5 py-3 text-sm">{EMAIL}</a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
