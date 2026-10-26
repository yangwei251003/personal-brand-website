import type { ReactNode } from "react";

import { isExternalHref, safeHref } from "@/lib/placeholders";

type PlaceholderLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  label: string;
  showStatus?: boolean;
};

export function PlaceholderLink({
  href,
  children,
  className,
  label,
  showStatus = true,
}: PlaceholderLinkProps) {
  const resolvedHref = safeHref(href);

  if (!resolvedHref) {
    return (
      <span
        className={className}
        data-link-state="placeholder"
        aria-label={`${label}，内容待补充`}
      >
        {children}
        {showStatus ? <span className="link-status">待补充</span> : null}
      </span>
    );
  }

  const external = isExternalHref(resolvedHref);

  return (
    <a
      className={className}
      href={resolvedHref}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
    >
      {children}
    </a>
  );
}
