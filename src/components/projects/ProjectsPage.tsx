import { getAllProjects, projectsPage } from '../../data/services';
import { pageHeroImages } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';
import { ProjectCard } from './ProjectCard';

export function ProjectsPage() {
  usePageMeta({
    title: projectsPage.title,
    description: projectsPage.description,
    path: projectsPage.path,
  });

  const projects = getAllProjects();

  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Recent plumbing projects"
        description={projectsPage.intro}
        image={pageHeroImages.projects.image}
        imageAlt={pageHeroImages.projects.imageAlt}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: projectsPage.path },
        ]}
      />
      <Section labelledBy="projects-grid-heading" className="bg-surface-alt">
        <h2 id="projects-grid-heading" className="sr-only">
          Project gallery
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <p className="mb-6 text-lg text-gray-700">
            Ready to start your next project? Get in touch for a transparent quote.
          </p>
          <Button as="a" href="/#contact" size="lg">
            Contact us
          </Button>
        </div>
      </Section>
    </>
  );
}
