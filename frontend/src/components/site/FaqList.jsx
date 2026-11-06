import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useT } from "@/lib/i18n";
import { FAQ } from "@/data/faq";

export const FaqList = ({ limit }) => {
  const { t } = useT();
  const items = limit ? FAQ.slice(0, limit) : FAQ;
  return (
    <Accordion type="single" collapsible data-testid="faq-accordion" className="border-t border-[var(--line)]">
      {items.map((f, i) => (
        <AccordionItem key={i} value={`f${i}`} className="border-b border-[var(--line)]">
          <AccordionTrigger data-testid={`faq-trigger-${i}`} className="py-6 text-left hover:no-underline">
            <span className="flex items-baseline gap-5">
              <span className="font-mono text-xs text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl font-bold uppercase leading-tight sm:text-3xl">{t(f.q)}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6 pl-10 text-base leading-relaxed text-[#c9cfd9]">{t(f.a)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
