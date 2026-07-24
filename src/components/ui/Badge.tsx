import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "outline", className = "" }) => {
  const baseStyle = "inline-flex items-center px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider border";
  
  const variants = {
    primary: "bg-primary-fixed text-primary border-outline-variant",
    secondary: "bg-secondary-fixed text-on-secondary-fixed-variant border-secondary-fixed-dim",
    tertiary: "bg-tertiary-fixed-dim/30 text-on-tertiary-fixed border-outline-variant",
    outline: "bg-surface-container-low text-on-surface-variant border-outline-variant",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
