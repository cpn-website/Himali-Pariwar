import React from "react";

interface HeritageDividerProps {
  className?: string;
  withOrnament?: boolean;
}

export const HeritageDivider: React.FC<HeritageDividerProps> = ({ className = "", withOrnament = false }) => {
  if (withOrnament) {
    return (
      <div className={`flex items-center justify-center my-stack-lg ${className}`}>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-outline-variant"></div>
        <div className="mx-4 flex space-x-1 items-center">
          <div className="w-1.5 h-1.5 rotate-45 bg-outline"></div>
          <div className="w-2.5 h-2.5 rotate-45 bg-primary"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-outline"></div>
        </div>
        <div className="flex-grow h-[1px] bg-gradient-to-l from-transparent to-outline-variant"></div>
      </div>
    );
  }

  return <hr className={`border-t border-outline-variant my-stack-md ${className}`} />;
};
