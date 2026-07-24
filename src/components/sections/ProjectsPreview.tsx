import { ArrowRight } from 'lucide-react';
import { getAllProjects } from '../../data/content';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';
import { ProjectCard } from '../projects/ProjectCard';

const PREVIEW_COUNT = 4;

export function ProjectsPreview() {
  const projects = getAllProjects().slice(0, PREVIEW_COUNT);

  return (
    <Section id="projects" labelledBy="projects-heading" className="bg-surface-alt">
      <div className="mb-12 text-center">
        <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
          Our work
        </p>
        <h2 id="projects-heading" className="text-3xl font-extrabold text-brand-dark md:text-4xl">
          Projects
        </h2>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Button as="a" href="/projects" variant="outline" size="lg">
          View all projects
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
        </Button>
      </div>
    </Section>
  );
}
