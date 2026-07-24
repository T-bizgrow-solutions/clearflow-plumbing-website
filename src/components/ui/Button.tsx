import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'lg';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: 'button';
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: 'a';
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  as,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-ui font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2';

  const variants = {
    primary: 'bg-brand-blue text-white hover:bg-brand-blue-hover',
    secondary: 'bg-brand-green text-white hover:bg-brand-green/90',
    outline:
      'border-2 border-brand-blue text-brand-blue bg-transparent hover:bg-brand-blue hover:text-white',
  };

  const sizes = {
    default: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (as === 'a') {
    const linkProps = props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;
    return (
      <a className={cls} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;
  return (
    <button className={cls} {...buttonProps}>
      {children}
    </button>
  );
}
