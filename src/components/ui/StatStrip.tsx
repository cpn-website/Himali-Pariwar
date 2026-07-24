"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface StatStripProps {
  stats: StatItem[];
}

interface CountUpProps {
  value: string;
}

const CountUp: React.FC<CountUpProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Extract number and suffix (e.g. "150+" -> number: 150, suffix: "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const end = targetNumber;
          const duration = 1500; // 1.5 seconds animation
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function: easeOutQuad (fast at first, slow at the end)
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * end);
            
            setDisplayValue(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, hasAnimated]);

  return (
    <span ref={elementRef}>
      {hasAnimated ? `${displayValue}${suffix}` : `0${suffix}`}
    </span>
  );
};

export const StatStrip: React.FC<StatStripProps> = ({ stats }) => {
  return (
    <section className="bg-surface-container-low border-y border-outline-variant py-stack-lg my-stack-lg">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-3xl mb-stack-sm animate-fade-in" style={{ fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
              <span className="font-serif text-3xl md:text-4xl font-bold text-on-surface mb-1">
                <CountUp value={stat.value} />
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
