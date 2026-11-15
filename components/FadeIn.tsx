"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Finom scroll fade-in: a tartalom akkor úszik be, amikor a viewportba ér.
 * Prefers-reduced-motion esetén a CSS kikapcsolja az animációt.
 */
export default function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Ha a böngésző nem ismeri a figyelőt, a tartalom azonnal látszódjon —
    // sosem maradhat láthatatlanul.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    // Küszöb helyett rootMargin: egy magas elem (mobilon az egyoszlopos
    // termékrács több ezer pixel) arányos küszöböt sosem érne el, és
    // láthatatlan maradna. Így elég, ha a teteje beér a képernyőre.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
