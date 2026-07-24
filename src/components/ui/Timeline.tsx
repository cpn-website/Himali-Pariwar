"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TimelineItem } from "@/data/timeline";
import { Locale } from "@/data/translations";

interface TimelineProps {
  items: TimelineItem[];
  locale: Locale;
}

export const Timeline: React.FC<TimelineProps> = ({ items, locale }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    requestAnimationFrame(checkMotion);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="relative border-l border-outline-variant ml-4 md:ml-0 md:max-w-3xl md:mx-auto">
        {items.map((item, index) => (
          <div key={index} className="relative pl-8 pb-12 last:pb-0">
            <div className="absolute w-4 h-4 rounded-full bg-surface-bright border-2 border-primary -left-[9px] top-1.5 z-10"></div>
            <div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-heritage hover:border-primary/55 transition-colors duration-300">
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
  }

  return (
    <div className="relative border-l border-outline-variant ml-4 md:ml-0 md:max-w-3xl md:mx-auto">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 pb-12 last:pb-0">
          
          {/* Animated Timeline Dot */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: index * 0.05,
            }}
            className="absolute w-4 h-4 rounded-full bg-surface-bright border-2 border-primary -left-[9px] top-1.5 z-10"
          ></motion.div>

          {/* Animated Timeline Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant shadow-heritage hover:border-primary/55 transition-colors duration-300 card-hover-lift"
          >
            <span className="font-sans text-label-sm font-bold text-primary tracking-wider uppercase mb-1 block">
              {item.year}
            </span>
            <h3 className="font-serif text-title-lg text-on-surface mb-2 font-semibold">
              {item.title[locale]}
            </h3>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              {item.description[locale]}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
