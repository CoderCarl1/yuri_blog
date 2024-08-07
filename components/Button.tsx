import cx from 'classnames';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant; // Add variant support
  size?: 'small' | 'medium' | 'large'; // Add size support
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>;

export default function Button({
  children,
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  onClick,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };

  const sizeClasses = {
    small: 'btn-sm',
    medium: 'btn-md',
    large: 'btn-lg',
  };

  return (
    <button
      type={type}
      className={cx("btn", variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled || loading} // Disable button when loading
      onClick={onClick}
      {...props}
    >
      {loading ? <span className="spinner" /> : children}
    </button>
  );
}