"use client";

import { useEffect, useRef, useState } from "react";

export type NavItem = {
  href: `#${string}`;
  label: string;
  shortLabel?: string;
};

type SmartNavProps = {
  brand: string;
  items: readonly NavItem[];
};

export function SmartNav({ brand, items }: SmartNavProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsCompact(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div ref={sentinelRef} className="nav-sentinel" aria-hidden="true" />
      <header className="site-nav-shell" data-compact={isCompact}>
        <div className="site-nav">
          <a className="brand-mark" href="#top" aria-label={`${brand}，回到顶部`}>
            <span className="brand-orbit" aria-hidden="true" />
            <span>{brand}</span>
          </a>

          <nav className="desktop-nav" aria-label="本页导航">
            {items.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "关闭本页导航" : "打开本页导航"}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="移动端本页导航"
          data-open={isOpen}
          hidden={!isOpen}
        >
          {items.map((item, index) => (
            <a
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={closeMenu}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.shortLabel ?? item.label}
            </a>
          ))}
        </nav>

        <span className="scroll-progress" aria-hidden="true" />
      </header>
    </>
  );
}
