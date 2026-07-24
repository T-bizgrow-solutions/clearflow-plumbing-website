import {
  getAllServices,
  servicesIndex,
  servicesIntro,
  servicesOutro,
} from '../../data/services';
import { pageHeroImages } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';
import { ServiceCard } from './ServiceCard';

export function ServicesIndexPage() {
  usePageMeta({
    title: servicesIndex.title,
    description: servicesIndex.description,
    path: servicesIndex.path,
  });

  const services = getAllServices();

  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Plumbing services across Sydney and NSW"
        description={servicesIntro}
        image={pageHeroImages.services.image}
        imageAlt={pageHeroImages.services.imageAlt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: servicesIndex.path },
        ]}
      />
      <Section labelledBy="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">
          All services
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="mb-6 text-lg leading-relaxed text-gray-700">{servicesOutro}</p>
          <Button as="a" href="/#contact" size="lg">
            Request a quote
          </Button>
        </div>
      </Section>
    </>
  );
}
