import React from "react";

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface StatStripProps {
  stats: StatItem[];
}

export const StatStrip: React.FC<StatStripProps> = ({ stats }) => {
  return (
    <section className="bg-surface-container-low border-y border-outline-variant py-stack-lg my-stack-lg">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-3xl mb-stack-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
              <span className="font-serif text-3xl md:text-4xl font-bold text-on-surface mb-1">
                {stat.value}
              </span>
              <span className="font-sans text-xs md:text-sm text-on-surface-variant font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
