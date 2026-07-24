import { type ReactNode } from 'react';

type SectionProps = {
  id?: string;
  labelledBy: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
};

export function Section({ id, labelledBy, className = '', children, dark = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`section-pad ${dark ? 'bg-surface-dark text-white' : ''} ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
