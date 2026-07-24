"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroEntranceProps {
  children: React.ReactNode;
}

export const HeroEntrance: React.FC<HeroEntranceProps> = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    requestAnimationFrame(checkMotion);
  }, []);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  // Children are: [Badge, Headline, Subtext, Buttons]
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
      {childrenArray.map((child, idx) => {
        let delay = 0;
        if (idx === 0) delay = 0; // Badge
        if (idx === 1) delay = 0.15; // Headline
        if (idx === 2) delay = 0.3; // Subtext
        if (idx === 3) delay = 0.45; // Buttons

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex justify-center"
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

interface HeroBgProps {
  children: React.ReactNode;
}

export const HeroBg: React.FC<HeroBgProps> = ({ children }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    requestAnimationFrame(checkMotion);
  }, []);

  if (prefersReducedMotion) {
    return <div className="absolute inset-0 z-0">{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {children}
    </motion.div>
  );
};
