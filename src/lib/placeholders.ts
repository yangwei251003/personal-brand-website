const PLACEHOLDER_PATTERN = /\{\{[A-Z][A-Z0-9_]*\}\}/;

export function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && PLACEHOLDER_PATTERN.test(value);
}

export function safeHref(value: unknown): string | undefined {
  if (typeof value !== "string" || isPlaceholder(value)) {
    return undefined;
  }

  const href = value.trim();

  if (!href || href === "#" || /[\u0000-\u001f\u007f]/.test(href)) {
    return undefined;
  }

  if (/^#[A-Za-z][\w:.-]*$/.test(href)) {
    return href;
  }

  if (/^\/(?!\/)[^\s]*$/.test(href)) {
    return href;
  }

  if (href.toLowerCase().startsWith("mailto:")) {
    const address = href.slice("mailto:".length);
    return /^[^\s@/?#]+@[^\s@/?#]+\.[^\s@/?#]+$/.test(address)
      ? href
      : undefined;
  }

  if (href.toLowerCase().startsWith("tel:")) {
    const number = href.slice("tel:".length);
    const digitCount = number.replace(/\D/g, "").length;
    return digitCount >= 5 && /^\+?[0-9().\s-]+$/.test(number)
      ? href
      : undefined;
  }

  try {
    const url = new URL(href);
    return (url.protocol === "https:" || url.protocol === "http:") &&
      Boolean(url.hostname)
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

export function isExternalHref(value: unknown): boolean {
  const href = safeHref(value);
  return href !== undefined && /^https?:\/\//i.test(href);
}
