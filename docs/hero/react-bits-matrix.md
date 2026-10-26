# React Bits Hero 候选审计

审计日期：2026-08-31（Asia/Shanghai）  
审计类型：React Bits 官方公开 Registry/Web/GitHub 快照审计，**不是 shadcn MCP 审计**。公开 `registry.json` 不含 `pagination` 字段，因此 total 是对 `items.length`、名称和变体完整性的重新计算，不能表述为 MCP `pagination.total`。

## Registry 完整性

来源：[官方公开 registry](https://reactbits.dev/r/registry.json)、[registry 构建配置](https://github.com/DavidHDev/react-bits/blob/main/jsrepo.config.ts)、[官方组件索引](https://reactbits.dev/get-started/index)、[官方仓库](https://github.com/DavidHDev/react-bits)。

快照 ETag：`W/"40a2d7d3110ca1dc443e4ab82b5fd56c"`。

| 核验项 | 数量 |
|---|---:|
| Registry items | 680 |
| 唯一 component family | 170 |
| 唯一 item name | 680 |
| 重复 item name | 0 |
| 非四变体 family | 0 |
| `JS-CSS` / `JS-TW` / `TS-CSS` / `TS-TW` | 各 170 |

170 个 TS-TW 条目的主要依赖分布：OGL 46、无额外依赖 41、GSAP 29、Motion 19、Three 12、其余混合依赖 23。

## 评分口径

叙事适配、性能、触控/移动端、无障碍与 reduced-motion、依赖一致性、维护成本各 0–4 分，总分 24。采用 ≥19；候选 15–18；≤14 淘汰；硬否决覆盖分数。

## Hero 候选矩阵

| 条目 | 职责 | 依赖 | 六项分数 | 总分 | 结论 |
|---|---|---|---|---:|---|
| [ShinyText-TS-TW](https://reactbits.dev/r/ShinyText-TS-TW.json) | 标题金属流光 | `motion` | 4/3/4/3/4/3 | 21 | 采用；只保留一个实例 |
| [BlurText-TS-TW](https://reactbits.dev/r/BlurText-TS-TW.json) | 标题入场 | `motion` | 4/2/4/2/4/3 | 19 | 不选；无内建 reduced-motion，且与 ShinyText 同槽 |
| [SpotlightCard-TS-TW](https://reactbits.dev/r/SpotlightCard-TS-TW.json) | 项目/荣誉卡片族 | 无 | 4/3/3/3/4/4 | 21 | 采用；触屏保持静态完整内容 |
| [TiltedCard-TS-TW](https://reactbits.dev/r/TiltedCard-TS-TW.json) | 项目卡片 | `motion` | 3/3/1/2/4/3 | 16 | 淘汰；移动端未优化且易依赖 hover |
| [MagicBento-TS-TW](https://reactbits.dev/r/MagicBento-TS-TW.json) | 卡片网格 | `gsap` | 4/2/2/2/1/2 | 13 | 淘汰；为卡片额外引入 GSAP |
| [Aurora-TS-TW](https://reactbits.dev/r/Aurora-TS-TW.json) | Hero 背景 | `ogl` | 4/2/4/1/3/2 | 16 | 硬否决；持续 RAF，无 reduced-motion/WebGL 失败降级 |
| [Silk-TS-TW](https://reactbits.dev/r/Silk-TS-TW.json) | Hero 背景 | Three + R3F | 4/1/4/1/0/2 | 12 | 硬否决；引入第二套重型 WebGL 依赖 |
| [DomeGallery-TS-TW](https://reactbits.dev/r/DomeGallery-TS-TW.json) | 照片墙 | `@use-gesture/react` | 4/2/3/1/3/1 | 14 | 硬否决；无 reduced-motion，键盘激活不足 |
| [CircularGallery-TS-TW](https://reactbits.dev/r/CircularGallery-TS-TW.json) | 照片墙 | `ogl` | 4/1/3/2/1/1 | 12 | 硬否决；持续 RAF、逐项语义不足、无静态降级 |
| [Masonry-TS-TW](https://reactbits.dev/r/Masonry-TS-TW.json) | 照片墙 | `gsap` | 3/2/2/0/1/2 | 10 | 硬否决；可点击 `div`、无键盘入口、图片为 CSS background |
| [ChromaGrid-TS-TW](https://reactbits.dev/r/ChromaGrid-TS-TW.json) | 作品网格 | `gsap` | 3/2/1/1/1/2 | 10 | 硬否决；主要表现依赖 hover，并引入 GSAP |
| [Magnet-TS-TW](https://reactbits.dev/r/Magnet-TS-TW.json) | CTA | 无 | 3/3/1/2/4/4 | 17 | 淘汰；全局 mousemove，触屏和键盘无等价效果 |
| [StarBorder-TS-TW](https://reactbits.dev/r/StarBorder-TS-TW.json) | CTA | 无 | 4/4/4/3/4/2 | 21 | 采用；需补 Tailwind v4 keyframes 与静态降级 |

## 硬否决摘要

- 无 WebGL/reduced-motion/Save-Data 静态降级：Aurora、Silk、DomeGallery、CircularGallery。
- 引入第二套重型依赖：Silk、MagicBento、Masonry、ChromaGrid。
- 关键内容或功能依赖 hover/mouse：TiltedCard、ChromaGrid、Magnet。
- 键盘或语义不足：DomeGallery、CircularGallery、Masonry。
- 本阶段不引入 OGL、Three 或 R3F；所有相关条目退出生产候选。

## 视觉选择后的源码级最终裁定

| 槽位 | 最终生产选择 |
|---|---|
| 主背景 | CSS 连续渐变、生成材质与静态 SVG；零 React Bits |
| 标题效果 | 静态金属色；可选一次性 CSS 扫光，零 Motion |
| 卡片效果族 | 静态金属边框 + fine pointer 的 CSS 固定微光 |
| 画廊效果 | 语义化 CSS 拼贴 |
| CTA 微交互 | 静态香槟金边框；hover/focus 单次 ≤600ms 扫光 |

最终生产采用 **零 React Bits、零 Motion、零 GSAP、零 WebGL**。此前 ≥19 分只代表 registry 级候选；视觉选择后的逐源码性能复核拥有最终否决权。没有安装任何 React Bits 条目。

## 最终否决理由与等价替代

- `ShinyText` 使用每帧更新且无限循环；改为静态文字，必要时只对非标题短元素播放一次 ≤1.2s CSS 扫光。
- `SpotlightCard` 在 mousemove 中读取布局并触发 React state；改为 CSS `:hover/:focus-within` 固定中央微光，触屏完全静态。
- `StarBorder` 使用无限 alternate 动画且无内建 reduced-motion；改为静态边框或用户 hover/focus 后单次扫光。
- 原始 registry 源码保留为研究链接，不复制进仓库、不进入生产依赖。
