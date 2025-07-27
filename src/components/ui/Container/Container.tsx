import React from "react";
import styles from "./Container.module.css";

export interface ContainerProps {
  /** Maximum width variant */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";

  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg" | "xl";

  /** Whether container should be centered */
  centered?: boolean;

  /** Additional CSS class */
  className?: string;

  /** Children content */
  children: React.ReactNode;

  /** HTML element to render */
  as?: "div" | "main" | "section" | "article" | "header" | "footer";
}

export const Container: React.FC<ContainerProps> = ({
  maxWidth = "xl",
  padding = "md",
  centered = true,
  className = "",
  children,
  as: Component = "div",
}) => {
  const containerClasses = [
    styles.container,
    styles[`maxWidth-${maxWidth}`],
    styles[`padding-${padding}`],
    centered && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={containerClasses}>{children}</Component>;
};
