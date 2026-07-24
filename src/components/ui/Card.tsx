import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", hoverEffect = true }) => {
  return (
    <div
      className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg shadow-heritage transition-all duration-300 ${
        hoverEffect ? "hover:-translate-y-1 hover:border-outline" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
