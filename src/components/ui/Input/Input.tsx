import React, { forwardRef } from "react";
import styles from "./Input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size variant */
  size?: "sm" | "md" | "lg";

  /** Label text */
  label?: string;

  /** Helper text below input */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Icon to display on the left */
  iconLeft?: React.ReactNode;

  /** Icon to display on the right */
  iconRight?: React.ReactNode;

  /** Whether input takes full width */
  fullWidth?: boolean;

  /** Additional CSS class for the container */
  className?: string;

  /** Additional CSS class for the input element */
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      label,
      helperText,
      error,
      iconLeft,
      iconRight,
      fullWidth = false,
      className = "",
      inputClassName = "",
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const containerClasses = [
      styles.container,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputWrapperClasses = [
      styles.inputWrapper,
      styles[`size-${size}`],
      error && styles.hasError,
      iconLeft && styles.hasIconLeft,
      iconRight && styles.hasIconRight,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [styles.input, inputClassName]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div className={inputWrapperClasses}>
          {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}

          <input ref={ref} id={inputId} className={inputClasses} {...props} />

          {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
        </div>

        {(error || helperText) && (
          <div className={styles.helperText}>
            <span className={error ? styles.errorText : styles.normalText}>
              {error || helperText}
            </span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
