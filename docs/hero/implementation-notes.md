# Hero 实现与交接说明

## 设计树

```text
/                         当前唯一正式页面
├── /projects             Later，只存在于蓝图
├── /skills               Later
├── /honors               Later
├── /about                Later
├── /blog                 Later
├── /videos               Later
├── /gallery              Later
└── /contact              Later
```

主页只提供本页锚点，不生成上述未来路由或伪链接。

## 页面结构

`src/app/page.tsx` 为服务端长页，依次包含导航、电影式首屏、身份摘要、精选项目、四类 AI 创作、荣誉展柜、成长时间线、博客、视频、照片墙、联系/简历与记忆点页尾。

客户端只包含：

- `SmartNav`：IntersectionObserver 判定收缩状态，移动菜单处理 Escape 与焦点回归。
- `PageEnhancer`：一次性区段淡入；无 JS 时正文默认可见。

## 动效政策

- 无 React Bits、Motion、GSAP、OGL、Three/R3F 或 WebGL。
- 无持续 RAF、滚动 scrub、滚动监听器、全局 pointermove、自动媒体或无限流光。
- CSS 仅处理 transform/opacity 微反馈；B 风格轨迹为静态、装饰性 SVG。
- reduced-motion 与 Save-Data 直接静态化；触屏不依赖 hover。

## 内容与链接

- 所有个人事实集中在 `src/content/placeholders.ts`。
- `src/content/profile.ts` 只通过 token 组装页面数据。
- `safeHref()` 会拒绝未替换 token、空值、`#`、`javascript:` 与非法联系方式。
- 无真实视频时不渲染 `<video>` 或播放按钮。

## 资产

- 候选母版：`docs/hero/visuals/`。
- 生产 AVIF/WebP：`public/assets/hero/`。
- 来源、提示词、许可证、尺寸、字节、哈希、alt 与采用状态：`docs/hero/asset-manifest.json`。
- 桌面与移动 Hero 使用独立构图；非首屏媒体全部懒加载。

## 继续开发的闸门

Hero 已完成并停止。只有用户实际浏览并反馈后，才启用 `grill-me`，每轮最多三个高影响问题；没有明确确认，不创建下一正式页面。
