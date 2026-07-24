import { ArrowRight } from 'lucide-react';
import { getAllServices, servicesIntro } from '../../data/content';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { ServiceCard } from '../services/ServiceCard';

const PREVIEW_COUNT = 4;

export function ServicesPreview() {
  const services = getAllServices().slice(0, PREVIEW_COUNT);

  return (
    <Section id="services" labelledBy="services-heading">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
          What we do
        </p>
        <h2 id="services-heading" className="mb-6 text-3xl font-extrabold text-brand-dark md:text-4xl">
          Services
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">{servicesIntro}</p>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service.slug}>
            <ServiceCard service={service} compact />
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Button as="a" href="/services" variant="outline" size="lg">
          View all services
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
