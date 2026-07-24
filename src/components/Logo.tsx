import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} text-primary transition-transform duration-300 hover:rotate-6`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer elegant ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      
      {/* Sun rising behind the peak (hope, community) */}
      <circle cx="50" cy="46" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Mountain peaks (Himali) */}
      <path d="M50 24 L22 72 L78 72 Z" fill="currentColor" />
      {/* Minor peak overlay for 3D look */}
      <path d="M36 44 L16 72 L56 72 Z" opacity="0.8" fill="currentColor" />
      
      {/* Base wave (family / water / community base) */}
      <path d="M18 72 C 34 76, 66 76, 82 72 C 72 80, 28 80, 18 72 Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
};
