import React from "react";
import styles from "./Card.module.css";

export interface CardProps {
  /** Visual variant */
  variant?: "default" | "bordered" | "elevated" | "flat";

  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";

  /** Whether card is clickable */
  clickable?: boolean;

  /** Click handler */
  onClick?: () => void;

  /** Additional CSS class */
  className?: string;

  /** Children content */
  children: React.ReactNode;

  /** HTML element to render */
  as?: "div" | "article" | "section";
}

export const Card: React.FC<CardProps> = ({
  variant = "default",
  padding = "md",
  clickable = false,
  onClick,
  className = "",
  children,
  as: Component = "div",
}) => {
  const cardClasses = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`padding-${padding}`],
    clickable && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (clickable && onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Component
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? "button" : undefined}
    >
      {children}
    </Component>
  );
};
