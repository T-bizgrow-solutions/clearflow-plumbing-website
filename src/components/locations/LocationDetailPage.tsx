import { CheckCircle2 } from 'lucide-react';
import {
  getLocationProjects,
  getLocationServices,
  locationsIndex,
  type Location,
} from '../../data/locations';
import { pageHeroImages } from '../../data/content';
import { buildLocationGraph } from '../../lib/seo/jsonLd';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';
import { ServiceCard } from '../services/ServiceCard';
import { ProjectCard } from '../projects/ProjectCard';
import { JsonLd } from '../seo/JsonLd';

type LocationDetailPageProps = {
  location: Location;
};

export function LocationDetailPage({ location }: LocationDetailPageProps) {
  const services = getLocationServices(location);
  const projects = getLocationProjects(location);

  usePageMeta({
    title: location.title,
    description: location.description,
    path: location.path,
  });

  return (
    <>
      <JsonLd data={buildLocationGraph(location)} />
      <PageHeader
        eyebrow={location.name}
        title={location.title}
        description={location.description}
        image={pageHeroImages.projects.image}
        imageAlt={`Plumbing services in ${location.name}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: locationsIndex.path },
          { label: location.name, href: location.path },
        ]}
      />

      <Section labelledBy="location-intro-heading">
        <div className="mx-auto max-w-3xl">
          <h2 id="location-intro-heading" className="sr-only">
            About our work in {location.name}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">{location.intro}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button as="a" href="/#contact" size="lg">
              Make a booking
            </Button>
            <Button as="a" href="/services" variant="outline" size="lg">
              View all services
            </Button>
          </div>
        </div>
      </Section>

      {services.length > 0 ? (
        <Section labelledBy="location-services-heading" className="bg-surface-alt">
          <h2
            id="location-services-heading"
            className="mb-8 font-display text-2xl font-extrabold text-brand-dark"
          >
            Services we emphasise in {location.name}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <ServiceCard service={service} compact />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {projects.length > 0 ? (
        <Section labelledBy="location-projects-heading">
          <h2
            id="location-projects-heading"
            className="mb-8 font-display text-2xl font-extrabold text-brand-dark"
          >
            Related projects
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Button as="a" href="/projects" variant="outline">
              See all projects
            </Button>
          </div>
        </Section>
      ) : null}

      {location.faqs && location.faqs.length > 0 ? (
        <Section labelledBy="location-faq-heading" className="bg-surface-alt">
          <h2
            id="location-faq-heading"
            className="mb-8 font-display text-2xl font-extrabold text-brand-dark"
          >
            Local questions
          </h2>
          <ul className="mx-auto max-w-3xl space-y-6">
            {location.faqs.map((faq) => (
              <li key={faq.question} className="rounded-2xl bg-white p-6 shadow-card">
                <h3 className="mb-3 flex gap-3 font-display text-lg font-bold text-brand-dark">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden />
                  {faq.question}
                </h3>
                <p className="pl-8 leading-relaxed text-gray-700">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section labelledBy="location-cta-heading" dark>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="location-cta-heading" className="mb-4 text-3xl font-extrabold">
            Need a plumber in {location.name}?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Tell us about your job — we respond within 48 hours, or call for emergencies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button as="a" href="/#contact" variant="secondary" size="lg">
              Contact us
            </Button>
            <Button
              as="a"
              href="/services"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-blue"
            >
              Explore services
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
