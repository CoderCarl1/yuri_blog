import Loading from './loading';
import cx from 'classnames';
import { TfiReload } from "react-icons/tfi";

const ButtonType =  ['button' , 'submit' , 'reset'] as const;
type ButtonType = typeof ButtonType[number];

const ButtonVariant = ['primary' , 'secondary' , 'outline'] as const;
type ButtonVariant = typeof ButtonVariant[number];

const ButtonSize =  ['small' , 'medium' , 'large'] as const;
type ButtonSize = typeof ButtonSize[number];

type ButtonProps = {
  children?: React.ReactNode;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant; // Add variant support
  size?: ButtonSize; // Add size support
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
      className={cx(
        "btn", 
        variantClasses[variant], 
        sizeClasses[size], 
        className,
        {disabled: disabled}
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {/* TODO:  fix the potential CLS */}
      {loading && <Loading />}
      {(!loading && type === 'reset') ? <TfiReload /> : null}
      {(!loading && children) && children}
    </button>
  );
}