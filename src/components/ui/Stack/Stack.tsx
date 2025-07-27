import React from "react";
import styles from "./Stack.module.css";

export interface StackProps {
  /** Direction of stack */
  direction?: "row" | "column";

  /** Spacing between items */
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

  /** Horizontal alignment */
  align?: "start" | "center" | "end" | "stretch";

  /** Vertical alignment (for row) or horizontal alignment (for column) */
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";

  /** Whether items should wrap */
  wrap?: boolean;

  /** Additional CSS class */
  className?: string;

  /** Children content */
  children: React.ReactNode;

  /** HTML element to render */
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
}

export const Stack: React.FC<StackProps> = ({
  direction = "column",
  spacing = "md",
  align = "stretch",
  justify = "start",
  wrap = false,
  className = "",
  children,
  as: Component = "div",
}) => {
  const stackClasses = [
    styles.stack,
    styles[`direction-${direction}`],
    styles[`spacing-${spacing}`],
    styles[`align-${align}`],
    styles[`justify-${justify}`],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={stackClasses}>{children}</Component>;
};
