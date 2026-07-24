import { director } from '../../data/content';
import { Section } from '../ui/Section';

export function Director() {
  return (
    <Section labelledBy="director-heading" className="bg-surface-alt">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="mb-2 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
            Meet Joshua
          </p>
          <h2 id="director-heading" className="mb-2 text-3xl font-extrabold text-brand-dark md:text-4xl">
            {director.name}
          </h2>
          <p className="mb-6 font-ui text-lg font-semibold text-brand-green">{director.role}</p>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            {director.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <img
            src={director.image}
            alt={`${director.name}, ${director.role}`}
            className="mx-auto w-full max-w-md rounded-2xl object-cover shadow-card"
            width={600}
            height={700}
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
