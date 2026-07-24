import React from "react";
import { TimelineItem } from "@/data/timeline";
import { Locale } from "@/data/translations";

interface TimelineProps {
  items: TimelineItem[];
  locale: Locale;
}

export const Timeline: React.FC<TimelineProps> = ({ items, locale }) => {
  return (
    <div className="relative border-l border-outline-variant ml-4 md:ml-0 md:max-w-3xl md:mx-auto">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 pb-12 last:pb-0">
          {/* Timeline Dot */}
          <div className="absolute w-4 h-4 rounded-full bg-surface-bright border-2 border-primary -left-2 top-1.5 z-10"></div>
          {/* Timeline Card */}
          <div className="bg-surface-container-lowest p-stack-md rounded-lg border border-outline-variant shadow-heritage hover:border-primary/55 transition-colors duration-300">
            <span className="font-sans text-label-sm font-bold text-primary tracking-wider uppercase mb-1 block">
              {item.year}
            </span>
            <h3 className="font-serif text-title-lg text-on-surface mb-2 font-semibold">
              {item.title[locale]}
            </h3>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {item.description[locale]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
