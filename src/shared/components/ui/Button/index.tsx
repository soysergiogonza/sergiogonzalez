import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'button-base',
        `button-${variant}`,
        `button-${size}`,
        isLoading && 'button-loading',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="loading-spinner" /> : children}
    </button>
  );
}; 