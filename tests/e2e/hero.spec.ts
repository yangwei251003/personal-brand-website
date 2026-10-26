import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const screenshotRoot = path.resolve("docs/hero/screenshots");
const sectionIds = [
  "hero",
  "identity",
  "projects",
  "ai-creation",
  "honors",
  "timeline",
  "blog",
  "videos",
  "gallery",
  "contact",
  "memory",
] as const;

function collectRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(`console: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));

  return errors;
}

async function warmLazyImages(page: Page) {
  const images = page.locator('img[loading="lazy"]');
  const count = await images.count();

  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((node) => {
          const element = node as HTMLImageElement;
          return element.complete && element.naturalWidth > 0;
        }),
      )
      .toBe(true);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
}

test.beforeAll(async () => {
  await mkdir(screenshotRoot, { recursive: true });
});

test("renders the complete honest Hero with no broken or future links", async ({
  page,
}) => {
  const errors = collectRuntimeErrors(page);
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.locator("main")).toBeVisible();

  for (const id of sectionIds) {
    await expect(page.locator(`#${id}`), id).toHaveCount(1);
  }

  await expect(page.locator('a[href*="{{"]')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator("video")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /播放/ })).toHaveCount(0);
  await expect(page.locator('[data-link-state="placeholder"]')).not.toHaveCount(0);
  const projectImages = page.locator(".project-media img");
  await expect(projectImages).toHaveCount(3);
  expect(
    await projectImages.evaluateAll((images) =>
      images.map((image) => image.getAttribute("loading")),
    ),
  ).toEqual(["lazy", "lazy", "lazy"]);
  await expect(
    page.locator('.contact-resume[data-link-state="placeholder"]'),
  ).toHaveCount(1);

  await page.waitForTimeout(250);
  expect(
    await page.evaluate(() =>
      document
        .getAnimations()
        .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);

  const futureRoutes = [
    "/projects",
    "/skills",
    "/honors",
    "/about",
    "/blog",
    "/videos",
    "/gallery",
    "/contact",
  ];
  const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href")),
  );

  expect(hrefs.filter((href) => href && futureRoutes.includes(href))).toEqual([]);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
  const undersizedTargets = await page.locator("a, button").evaluateAll((nodes) =>
    nodes.flatMap((node) => {
      const element = node as HTMLElement;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const visible = style.display !== "none" && style.visibility !== "hidden" &&
        rect.width > 0 && rect.height > 0;

      return visible && (rect.width < 44 || rect.height < 44)
        ? [{ label: element.getAttribute("aria-label") ?? element.textContent, width: rect.width, height: rect.height }]
        : [];
    }),
  );
  expect(undersizedTargets).toEqual([]);
  expect(errors).toEqual([]);
});

test("anchor CTAs land below the compact navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "看精选项目" }).click();

  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator(".site-nav-shell")).toHaveAttribute(
    "data-compact",
    "true",
  );
  await expect
    .poll(() => page.locator("#projects").evaluate((node) => node.getBoundingClientRect().top))
    .toBeLessThan(120);
  const anchorPosition = await page.evaluate(() => ({
    navigationBottom: document
      .querySelector<HTMLElement>(".site-nav")!
      .getBoundingClientRect().bottom,
    targetTop: document
      .querySelector<HTMLElement>("#projects")!
      .getBoundingClientRect().top,
  }));
  expect(anchorPosition.targetTop).toBeGreaterThanOrEqual(
    anchorPosition.navigationBottom,
  );
});

test("skip link, focus ring, and mobile menu work with the keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "跳到主要内容" })).toBeFocused();
  const outlineWidth = await page
    .getByRole("link", { name: "跳到主要内容" })
    .evaluate((node) => getComputedStyle(node).outlineWidth);
  expect(Number.parseFloat(outlineWidth)).toBeGreaterThanOrEqual(2);

  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-navigation a").first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "打开本页导航" })).toBeFocused();
  await expect(page.getByRole("button", { name: "打开本页导航" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );

  await page.getByRole("button", { name: "打开本页导航" }).click();
  await page.locator("#mobile-navigation").getByRole("link", { name: "成长" }).click();
  await expect(page).toHaveURL(/#timeline$/);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
});

test("reduced motion and missing WebGL keep all core content available", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      contextId: string,
      ...args: unknown[]
    ) {
      if (contextId === "webgl" || contextId === "webgl2") {
        return null;
      }
      return Reflect.apply(original, this, [contextId, ...args]) as never;
    } as typeof HTMLCanvasElement.prototype.getContext;
  });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator('[data-reveal-state="pending"]')).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#contact")).toContainText("下一段轨迹");

  const motionState = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    longRunningAnimations: document
      .getAnimations()
      .filter((animation) => {
        const timing = animation.effect?.getTiming();
        return animation.playState === "running" &&
          typeof timing?.duration === "number" &&
          timing.duration > 150;
      }).length,
    canvases: document.querySelectorAll("canvas").length,
  }));

  expect(motionState.scrollBehavior).toBe("auto");
  expect(motionState.longRunningAnimations).toBe(0);
  expect(motionState.canvases).toBe(0);
});

test("Save-Data applies the same static motion policy", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "connection", {
      configurable: true,
      value: { saveData: true },
    });
  });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator("html")).toHaveAttribute("data-motion", "static");
  await expect(page.locator('[data-reveal-state="pending"]')).toHaveCount(0);

  const motionState = await page.evaluate(() => ({
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
    progressAnimation: getComputedStyle(
      document.querySelector<HTMLElement>(".scroll-progress")!,
    ).animationName,
    progressTimeline: getComputedStyle(
      document.querySelector<HTMLElement>(".scroll-progress")!,
    ).getPropertyValue("animation-timeline"),
    navigationFilter: getComputedStyle(
      document.querySelector<HTMLElement>(".site-nav")!,
    ).backdropFilter,
    runningAnimations: document
      .getAnimations()
      .filter((animation) => animation.playState === "running").length,
  }));

  expect(motionState.scrollBehavior).toBe("auto");
  expect(motionState.progressAnimation).toBe("none");
  expect(motionState.progressTimeline).toBe("auto");
  expect(motionState.navigationFilter).toBe("none");
  expect(motionState.runningAnimations).toBe(0);
});

test("unknown routes return the framework 404", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.getByText("404")).toBeVisible();
});

test("local production vitals remain inside the laboratory budget", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const metrics = { cls: 0, lcp: 0 };
    Object.assign(window, { __heroMetrics: metrics });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.lcp = entry.startTime;
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<
        PerformanceEntry & { hadRecentInput?: boolean; value?: number }
      >) {
        if (!entry.hadRecentInput) {
          metrics.cls += entry.value ?? 0;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const metrics = await page.evaluate(() => {
    const vitals = (
      window as unknown as Window & { __heroMetrics: { cls: number; lcp: number } }
    ).__heroMetrics;
    const transferBytes = performance
      .getEntriesByType("resource")
      .reduce((total, entry) => {
        const resource = entry as PerformanceResourceTiming;
        return total + resource.transferSize;
      }, 0);

    return { ...vitals, transferBytes };
  });

  expect(metrics.lcp).toBeGreaterThan(0);
  expect(metrics.lcp).toBeLessThanOrEqual(2_500);
  expect(metrics.cls).toBeLessThanOrEqual(0.1);
  expect(metrics.transferBytes).toBeLessThanOrEqual(600_000);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  const interactionMs = await page.evaluate(async () => {
    const button = document.querySelector<HTMLButtonElement>(".menu-toggle");
    if (!button) {
      throw new Error("mobile menu button missing");
    }
    const startedAt = performance.now();
    button.click();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return performance.now() - startedAt;
  });

  expect(interactionMs).toBeLessThanOrEqual(200);
  process.stdout.write(
    `LAB_VITALS lcp=${metrics.lcp.toFixed(1)}ms cls=${metrics.cls.toFixed(4)} transfer=${metrics.transferBytes}B interaction=${interactionMs.toFixed(1)}ms\n`,
  );
});

for (const viewport of [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1024x768", width: 1024, height: 768 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "mobile-390x844", width: 390, height: 844 },
] as const) {
  test(`captures ${viewport.name} visual evidence`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/", { waitUntil: "networkidle" });
    await warmLazyImages(page);

    await page.screenshot({
      path: path.join(screenshotRoot, `${viewport.name}-full.png`),
      fullPage: true,
    });
  });
}

test("captures key desktop sections", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await warmLazyImages(page);
  await page.locator(".skip-link").evaluate((node) => {
    (node as HTMLElement).hidden = true;
  });
  await page.locator("#hero").screenshot({
    path: path.join(screenshotRoot, "section-hero.png"),
  });
  await page.locator(".site-nav-shell").evaluate((node) => {
    (node as HTMLElement).hidden = true;
  });

  for (const id of ["projects", "timeline", "contact"] as const) {
    await page.locator(`#${id}`).screenshot({
      path: path.join(screenshotRoot, `section-${id}.png`),
    });
  }
});
