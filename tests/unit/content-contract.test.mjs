import assert from "node:assert/strict";
import test from "node:test";

import {
  PLACEHOLDERS,
  PLACEHOLDER_LIST,
} from "../../src/content/placeholders.ts";
import {
  isExternalHref,
  isPlaceholder,
  safeHref,
} from "../../src/lib/placeholders.ts";

test("placeholder tokens are unique and follow the canonical shape", () => {
  const values = PLACEHOLDER_LIST.map((item) => item.raw);

  assert.equal(new Set(values).size, values.length);
  assert.equal(values.length, Object.keys(PLACEHOLDERS).length);

  for (const item of PLACEHOLDER_LIST) {
    assert.match(item.raw, /^\{\{[A-Z][A-Z0-9_]*\}\}$/);
    assert.equal(item.status, "unresolved");
  }
});

test("placeholder detection catches whole and embedded tokens", () => {
  assert.equal(isPlaceholder("{{EMAIL_ADDRESS}}"), true);
  assert.equal(isPlaceholder("mailto:{{EMAIL_ADDRESS}}"), true);
  assert.equal(isPlaceholder("普通文本"), false);
});

test("unsafe and unresolved links are suppressed", () => {
  const rejected = [
    "",
    "#",
    "javascript:alert(1)",
    "mailto:{{EMAIL_ADDRESS}}",
    "tel:{{PHONE_NUMBER}}",
    "{{RESUME_URL}}",
    "data:text/html,hello",
    "not a url",
  ];

  for (const value of rejected) {
    assert.equal(safeHref(value), undefined, value);
  }
});

test("valid anchors, local paths, contacts, and web URLs are preserved", () => {
  assert.equal(safeHref("#projects"), "#projects");
  assert.equal(safeHref("/resume.pdf"), "/resume.pdf");
  assert.equal(safeHref("mailto:name@example.com"), "mailto:name@example.com");
  assert.equal(safeHref("tel:+86 138 0000 0000"), "tel:+86 138 0000 0000");
  assert.equal(safeHref("https://example.com/work"), "https://example.com/work");
  assert.equal(isExternalHref("https://example.com/work"), true);
  assert.equal(isExternalHref("#projects"), false);
});
