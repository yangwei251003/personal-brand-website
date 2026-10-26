"use client";

import { useEffect } from "react";

import { resolveMotionPolicy } from "@/lib/motion-policy";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export function PageEnhancer() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData = Boolean(
      (navigator as NavigatorWithConnection).connection?.saveData,
    );
    const policy = resolveMotionPolicy({
      reducedMotion: reduceMotion,
      saveData,
      coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      webgl: false,
    });
    document.documentElement.dataset.motion = policy.mode;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (
      policy.mode === "static" ||
      !("IntersectionObserver" in window)
    ) {
      targets.forEach((target) => target.dataset.revealState = "visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          (entry.target as HTMLElement).dataset.revealState = "visible";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((target) => {
      const bounds = target.getBoundingClientRect();
      const isInitiallyVisible = bounds.top < window.innerHeight * 0.92;

      target.dataset.revealState = isInitiallyVisible ? "visible" : "pending";
      if (!isInitiallyVisible) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
