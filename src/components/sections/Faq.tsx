import { useId, useState, type HTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/content';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Section } from '../ui/Section';

type FaqItem = {
  question: string;
  answer: string;
};

function FaqAccordionItem({
  item,
  open,
  onToggle,
  buttonId,
  panelId,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  buttonId: string;
  panelId: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          <span>{item.question}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-brand-blue transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden
          />
        </button>
      </h3>
      {/* Answer stays in the DOM when collapsed (CSS hidden / inert — never unmounted). */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        {...(!open ? ({ inert: '' } as HTMLAttributes<HTMLDivElement>) : {})}
        className={
          open
            ? 'overflow-hidden pb-5'
            : prefersReducedMotion
              ? 'hidden'
              : 'grid grid-rows-[0fr] overflow-hidden opacity-0'
        }
      >
        <p className="min-h-0 pr-10 text-base leading-relaxed text-gray-700">{item.answer}</p>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const items = faqs as readonly FaqItem[];

  return (
    <Section id="faq" labelledBy="faq-heading" className="bg-surface-alt">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
          FAQ
        </p>
        <h2 id="faq-heading" className="mb-8 text-3xl font-extrabold text-brand-dark md:text-4xl">
          Frequently asked questions
        </h2>
        <div className="rounded-2xl border border-gray-100 bg-white px-5 shadow-card sm:px-8">
          {items.map((item, index) => (
            <FaqAccordionItem
              key={item.question}
              item={item}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              buttonId={`${baseId}-faq-${index}-button`}
              panelId={`${baseId}-faq-${index}-panel`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
