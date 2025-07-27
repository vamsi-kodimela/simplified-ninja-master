import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant - minimal options only */
  variant?: "primary" | "secondary" | "ghost";

  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Whether button is in loading state */
  loading?: boolean;

  /** Icon to display before text */
  iconLeft?: React.ReactNode;

  /** Icon to display after text */
  iconRight?: React.ReactNode;

  /** Whether button should take full width */
  fullWidth?: boolean;

  /** Additional CSS class */
  className?: string;

  /** Button content */
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const buttonClasses = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={isDisabled} {...props}>
      {!loading && iconLeft && (
        <span className={styles.iconLeft}>{iconLeft}</span>
      )}
      {children && <span className={styles.content}>{children}</span>}
      {!loading && iconRight && (
        <span className={styles.iconRight}>{iconRight}</span>
      )}
    </button>
  );
};
