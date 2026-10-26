import type { MotionPolicy } from "@/content/types";

type MotionSignals = Pick<
  MotionPolicy,
  "reducedMotion" | "saveData" | "coarsePointer" | "webgl"
>;

export function resolveMotionPolicy(signals: MotionSignals): MotionPolicy {
  const mode = signals.reducedMotion || signals.saveData
    ? "static"
    : signals.coarsePointer
      ? "reduced"
      : "full";

  return {
    ...signals,
    mode,
    allowContinuousMotion: false,
    allowParallax: false,
  };
}
