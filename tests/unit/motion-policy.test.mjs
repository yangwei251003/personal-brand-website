import assert from "node:assert/strict";
import test from "node:test";

import { resolveMotionPolicy } from "../../src/lib/motion-policy.ts";

const fullSignals = {
  reducedMotion: false,
  saveData: false,
  coarsePointer: false,
  webgl: true,
};

test("full mode still forbids continuous motion and parallax", () => {
  const policy = resolveMotionPolicy(fullSignals);

  assert.equal(policy.mode, "full");
  assert.equal(policy.allowContinuousMotion, false);
  assert.equal(policy.allowParallax, false);
});

test("coarse pointer reduces enhancement", () => {
  assert.equal(
    resolveMotionPolicy({ ...fullSignals, coarsePointer: true }).mode,
    "reduced",
  );
});

test("reduced motion and Save-Data force static output", () => {
  assert.equal(
    resolveMotionPolicy({ ...fullSignals, reducedMotion: true }).mode,
    "static",
  );
  assert.equal(
    resolveMotionPolicy({ ...fullSignals, saveData: true }).mode,
    "static",
  );
});

test("WebGL availability never changes the core experience", () => {
  const withWebgl = resolveMotionPolicy(fullSignals);
  const withoutWebgl = resolveMotionPolicy({ ...fullSignals, webgl: false });

  assert.equal(withWebgl.mode, withoutWebgl.mode);
});
