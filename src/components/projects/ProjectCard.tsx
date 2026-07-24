import type { Project } from '../../data/services';

const categoryLabels: Record<Project['category'], string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  specialist: 'Specialist',
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card">
      <div className="aspect-[4/3] shrink-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 min-h-[2.5rem] font-ui text-xs font-semibold uppercase leading-snug tracking-wider text-brand-blue line-clamp-2">
          {categoryLabels[project.category]}
          {project.location ? ` · ${project.location}` : ''}
        </p>
        <h2 className="mb-2 min-h-[2.75rem] font-display text-base font-bold uppercase leading-snug tracking-wide text-brand-dark line-clamp-2">
          {project.title}
        </h2>
        <p className="mt-auto text-sm leading-relaxed text-gray-600 line-clamp-3">{project.summary}</p>
      </div>
    </article>
  );
}
