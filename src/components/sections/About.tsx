import { about } from '../../data/content';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
            About us
          </p>
          <h2 id="about-heading" className="mb-6 text-3xl font-extrabold text-brand-dark md:text-4xl">
            Trusted plumbing across Sydney and beyond
          </h2>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button as="a" href="/#contact">
              Make a booking
            </Button>
            <Button as="a" href="/#contact" variant="outline">
              Request a quote
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="/about-plumbing.jpg"
            alt="ClearFlow Plumbing team at work on a commercial plumbing project"
            className="w-full rounded-2xl object-cover shadow-card"
            width={800}
            height={600}
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
