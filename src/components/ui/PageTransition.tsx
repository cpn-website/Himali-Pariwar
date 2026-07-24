"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    requestAnimationFrame(checkMotion);
  }, []);

  if (prefersReducedMotion) {
    return <div className="flex flex-col flex-grow w-full">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
      className="flex flex-col flex-grow w-full"
    >
      {children}
    </motion.div>
  );
};
