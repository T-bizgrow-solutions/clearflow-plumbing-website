import { CheckCircle2 } from 'lucide-react';
import type { Service } from '../../data/services';
import { servicesIndex } from '../../data/services';
import { pageHeroImages } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';
import { ServiceCard } from './ServiceCard';

type ServiceDetailPageProps = {
  service: Service;
  related: Service[];
};

export function ServiceDetailPage({ service, related }: ServiceDetailPageProps) {
  usePageMeta({
    title: service.title,
    description: `${service.shortDescription} — ClearFlow Plumbing & Maintenance, licensed Sydney plumbers.`,
    path: service.path,
  });

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.shortDescription}
        image={pageHeroImages.services.image}
        imageAlt={pageHeroImages.services.imageAlt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: servicesIndex.path },
          { label: service.title, href: service.path },
        ]}
      />

      <Section labelledBy="service-detail-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-8 flex items-center justify-center rounded-2xl bg-surface-alt p-10">
              <img
                src={service.image}
                alt=""
                className="max-h-64 w-full max-w-sm object-contain"
                width={320}
                height={320}
              />
            </div>
          </div>

          <div>
            <h2 id="service-detail-heading" className="sr-only">
              About {service.title}
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-700">{service.intro}</p>

            <h3 className="mb-4 font-display text-xl font-bold text-brand-dark">What we deliver</h3>
            <ul className="mb-8 space-y-3">
              {service.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-gray-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 font-display text-xl font-bold text-brand-dark">Ideal for</h3>
            <ul className="mb-8 flex flex-wrap gap-2">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-brand-blue/10 px-4 py-1.5 font-ui text-sm font-semibold text-brand-blue"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button as="a" href="/#contact" size="lg">
                Make a booking
              </Button>
              <Button as="a" href="/#contact" variant="outline" size="lg">
                Request a quote
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section labelledBy="related-services-heading" className="bg-surface-alt">
          <h2 id="related-services-heading" className="mb-8 text-2xl font-extrabold text-brand-dark">
            Other services
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ServiceCard service={item} compact />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
