import { CheckCircle2 } from 'lucide-react';
import { whyChooseUs } from '../../data/content';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

export function WhyChooseUs() {
  return (
    <Section labelledBy="why-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
            Why ClearFlow
          </p>
          <h2 id="why-heading" className="mb-6 text-3xl font-extrabold text-brand-dark md:text-4xl">
            Why choose us?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">{whyChooseUs.intro}</p>
          <p className="mb-4 font-display text-lg font-bold text-brand-dark">Our commitment includes:</p>
          <ul className="space-y-4">
            {whyChooseUs.commitments.map((item) => (
              <li key={item} className="flex gap-3 text-gray-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-brand-blue p-8 text-white md:p-10">
          <p className="mb-6 text-lg leading-relaxed text-white/90">{whyChooseUs.outro}</p>
          <p className="mb-4 text-lg font-semibold">
            Ready to experience unparalleled plumbing service? Whether it’s booking an appointment or
            addressing an emergency query, our team is here to help.
          </p>
          <p className="mb-8 text-white/90">
            To discuss your requirements, reach out via our contact form or book a job.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button as="a" href="/#contact" variant="secondary">
              Make a booking
            </Button>
            <Button
              as="a"
              href="/#contact"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-blue"
            >
              Request a quote
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
