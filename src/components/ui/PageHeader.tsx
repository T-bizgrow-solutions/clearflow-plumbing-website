type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  image?: string;
  imageAlt?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  imageAlt,
}: PageHeaderProps) {
  return (
    <div className="relative min-h-[280px] overflow-hidden border-b border-gray-200 text-white md:min-h-[320px]">
      {image ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={imageAlt}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/70 to-brand-blue/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-[#0077b3]" />
      )}

      <div className="relative z-10 mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 md:min-h-[320px] lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden>/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-white">
                      {crumb.label}
                    </span>
                  ) : (
                    <a href={crumb.href} className="hover:text-white hover:underline">
                      {crumb.label}
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">{description}</p>
        )}
      </div>
    </div>
  );
}
