import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";

import { PLACEHOLDERS } from "@/content/placeholders";
import { publicAsset } from "@/lib/public-asset";

import "./globals.css";

export const metadata: Metadata = {
  title: `${PLACEHOLDERS.DISPLAY_NAME.raw}｜个人数字珍藏馆`,
  description: "开发中的占位内容演示，个人品牌长篇主页原型；并非作者真实履历。",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09070d",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const textureStyle = {
    "--grain-avif": `url("${publicAsset("/assets/hero/texture-dark-grain.avif")}")`,
    "--grain-webp": `url("${publicAsset("/assets/hero/texture-dark-grain.webp")}")`,
  } as CSSProperties;
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="preload"
          as="image"
          href={publicAsset("/assets/hero/hero-mobile.avif")}
          type="image/avif"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={publicAsset("/assets/hero/hero-desktop.avif")}
          type="image/avif"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
      </head>
      <body style={textureStyle}>{children}</body>
    </html>
  );
}
