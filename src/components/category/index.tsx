import React from "react";
import styles from "./category.module.css";

interface CategoryProps {
  name: string;
  icon?: string;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
}

const Category: React.FC<CategoryProps> = ({
  name,
  icon,
  onClick,
  className = "",
}) => {
  // Generate a consistent color variant based on the name
  const getColorVariant = (text: string): string => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = (Math.abs(hash) % 8) + 1;
    return `colorVariant${colorIndex}`;
  };

  // Get the first letter of the title for fallback
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  const colorVariant = getColorVariant(name);

  return (
    <div
      className={`${styles.category} ${className}`}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <div className={`${styles.iconWrapper} ${styles[colorVariant]}`}>
        {icon ? (
          <img
            src={icon}
            alt={`${name} icon`}
            className={styles.icon}
            onError={(e) => {
              // Fallback to letter if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              if (target.nextSibling) {
                (target.nextSibling as HTMLElement).style.display = "block";
              }
            }}
          />
        ) : null}
        <span
          style={{
            display: icon ? "none" : "block",
          }}
        >
          {firstLetter}
        </span>
      </div>
      <span className={styles.title}>{name}</span>
    </div>
  );
};

export { Category };
