import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const manifestPath = path.join(projectRoot, "docs/hero/asset-manifest.json");
const productionRoot = path.join(projectRoot, "public/assets/hero");

test("asset manifest matches the nested AssetRecord contract", async () => {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

  assert.equal(manifest.schemaVersion, 2);
  assert.ok(Array.isArray(manifest.assets));
  assert.ok(manifest.assets.length > 0);

  for (const asset of manifest.assets) {
    for (const field of [
      "id",
      "type",
      "purpose",
      "sections",
      "sourceType",
      "creator",
      "generationId",
      "generatedAt",
      "licenseId",
      "licenseUrl",
      "source",
      "visualDescription",
      "alt",
      "decorative",
      "replacementToken",
      "optimizationStatus",
      "adoptionStatus",
      "derivatives",
    ]) {
      assert.ok(Object.hasOwn(asset, field), `${asset.id}.${field}`);
    }
    assert.ok(Array.isArray(asset.sections), `${asset.id}.sections`);
    assert.ok(Array.isArray(asset.derivatives), `${asset.id}.derivatives`);
    assert.match(asset.source.sha256, /^[A-F0-9]{64}$/, `${asset.id}.source.sha256`);
    assert.ok(asset.source.width > 0 && asset.source.height > 0, asset.id);

    for (const derivative of asset.derivatives) {
      assert.match(derivative.sha256, /^[A-F0-9]{64}$/, derivative.path);
      assert.ok(derivative.width > 0 && derivative.height > 0, derivative.path);
      assert.ok(Number.isInteger(derivative.bytes) && derivative.bytes > 0);
      assert.ok(Number.isFinite(derivative.quality), derivative.path);
    }
  }
});

test("every production asset is adopted, optimized, and manifest-backed", async () => {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const derivatives = manifest.assets.flatMap((asset) =>
    asset.derivatives.map((derivative) => ({
      ...derivative,
      asset,
    })),
  );
  const productionFiles = (await readdir(productionRoot)).sort();
  const manifestFiles = derivatives
    .map((item) => path.basename(item.path))
    .sort();

  assert.deepEqual(productionFiles, manifestFiles);

  for (const derivative of derivatives) {
    const absolutePath = path.join(projectRoot, derivative.path);
    const bytes = await stat(absolutePath);
    const hash = createHash("sha256")
      .update(await readFile(absolutePath))
      .digest("hex")
      .toUpperCase();

    assert.equal(bytes.size, derivative.bytes, derivative.path);
    assert.equal(hash, derivative.sha256, derivative.path);
    assert.match(derivative.asset.adoptionStatus, /^adopted/);
    assert.equal(
      derivative.asset.optimizationStatus,
      "optimized-production-ready",
    );
    assert.match(derivative.format, /^(avif|webp)$/);
  }
});

test("Hero derivatives respect their frozen byte budgets", async () => {
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const assetsById = Object.fromEntries(
    manifest.assets.map((asset) => [asset.id, asset]),
  );
  const desktop = assetsById["DIR-A"].derivatives;
  const mobile = assetsById["HERO-MOBILE"].derivatives;
  const budgets = manifest.productionPolicy.heroBudgetsBytes;

  assert.ok(desktop.find((item) => item.format === "avif").bytes <= budgets.desktopAvif);
  assert.ok(desktop.find((item) => item.format === "webp").bytes <= budgets.desktopWebp);
  assert.ok(mobile.every((item) => item.bytes <= budgets.mobileEachFormat));
});
