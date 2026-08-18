"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function AnimatedNumber({
  value,
  formatter,
  className = "",
}: {
  value: number;
  formatter: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVue = useInView(ref, { once: true, margin: "-10% 0px" });
  const motionValue = useMotionValue(0);
  const ressort = useSpring(motionValue, { duration: 900, bounce: 0 });

  useEffect(() => {
    if (enVue) {
      motionValue.set(value);
    }
  }, [enVue, value, motionValue]);

  useEffect(() => {
    return ressort.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter(Math.round(latest));
      }
    });
  }, [ressort, formatter]);

  return (
    <span ref={ref} className={className}>
      {formatter(0)}
    </span>
  );
}
