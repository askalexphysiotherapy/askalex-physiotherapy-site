"use client";

import React from "react";
import { motion } from "framer-motion";

/** Safe custom hook for prefers-reduced-motion (no Framer hook needed) */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();

    // Older browsers use addListener/removeListener
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      // @ts-ignore
      mq.addListener(update);
      // @ts-ignore
      return () => mq.removeListener(update);
    }
  }, []);

  return reduced;
}

export function MotionViewport({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      {children}
    </motion.div>
  );
}
