import { ArrowRight } from 'lucide-react';
import type { Service } from '../../data/services';

type ServiceCardProps = {
  service: Service;
  compact?: boolean;
};

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <a
      href={service.path}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-shadow hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
    >
      <div className={`overflow-hidden bg-surface-alt p-6 ${compact ? 'aspect-[4/3]' : 'aspect-square'}`}>
        <img
          src={service.image}
          alt=""
          className="mx-auto h-full w-full max-w-[200px] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-2 font-display text-lg font-bold uppercase tracking-wide text-brand-dark">
          {service.title}
        </h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{service.shortDescription}</p>
        <span className="inline-flex items-center gap-1 font-ui text-sm font-semibold text-brand-blue">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </a>
  );
}
