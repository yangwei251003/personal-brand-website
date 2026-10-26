# System Blueprint

- Blueprint version：`1.0.0-hero`
- Last updated：2026-08-31
- Status：Approved
- Authority：技术边界、数据模型、不变量、状态、文件组织与非功能要求的唯一权威。

## 系统边界

- 客户端：Next.js 16 App Router，React 19，TypeScript 5.9，Tailwind CSS 4。
- 渲染：`/` 静态预渲染；服务端组件承载内容，少量客户端叶组件承载导航、观察器和微交互。
- 存储：无数据库、CMS、浏览器持久化或服务端会话。
- 第三方：仅构建期 npm 基础依赖；零 Motion/React Bits/GSAP/WebGL；运行时不请求第三方内容。
- 媒体：生产资产只来自 `public/assets/hero/`；候选留在 `docs/hero/visuals/`。
- 信任边界：所有个人事实视为未验证输入，直到用户替换显式 token。

## 文件边界

```text
src/app/                 路由、布局、全局样式
src/components/          服务端组件与客户端叶组件
src/content/             token、类型与页面数据
src/lib/                 纯函数、链接与动效策略
public/assets/hero/       仅入选且优化后的生产资产
docs/hero/                研究、候选视觉与资产清单
docs/product-blueprint/   权威蓝图
tests/                    单元与 E2E
```

## 数据模型

| 类型 | 关键字段 | 状态 | 不变量 |
|---|---|---|---|
| `PlaceholderToken` | `key`, `raw`, `label`, `kind` | unresolved/resolved | `raw` 统一为 `{{UPPER_SNAKE_CASE}}` |
| `ProfileContent` | identity, projects, honors, timeline, previews, contact | static | 只通过集中 token 组装个人事实 |
| `ProjectPreview` | id, title, role, summary, outcome, href, assetId | placeholder/ready | 未解析 href 不可导航 |
| `HonorPreview` | id, title, issuer, date, description | placeholder/ready | 不从图片推断奖项事实 |
| `ContentPreview` | id, kind, title, summary, href, status | empty/placeholder/ready | 空视频不得渲染播放动作 |
| `AssetRecord` | source, license, dimensions, bytes, hash, alt, status | candidate/adopted/rejected | 只有 adopted+optimized 可进入生产目录 |
| `MotionPolicy` | reducedMotion, saveData, coarsePointer, webgl | full/reduced/static | 任一强降级信号都不得破坏核心任务 |

## 状态与不变量

### 链接状态

`placeholder → disabled`；`resolved + valid → enabled`；`resolved + invalid → disabled/error in development`。

- `isPlaceholder()` 必须识别整个 token 和包含 token 的字符串。
- 禁止把 `#`、空字符串、`javascript:` 或未解析 `mailto:`/`tel:` 当有效链接。
- 外部 `target="_blank"` 必须带 `rel="noreferrer noopener"`。

### 资产状态

`candidate → reviewed → adopted → optimized → referenced`；任何节点可进入 `rejected`。

- 候选/备用/淘汰资产不得进入 `public/`。
- `public/` 中每个资产必须被源码引用并存在 manifest 记录。
- 装饰图使用空 alt；传达新信息的图必须有具体 alt。

### 动效状态

`full → reduced → static`，只允许向更低强度降级。

- reduced-motion 优先级最高；Save-Data 与 coarse pointer 至少进入 reduced。
- 无 IntersectionObserver/JS 时内容默认可见。
- 不引入 React Bits、Motion、OGL、Three/R3F 或 GSAP；无 WebGL 逻辑即天然满足无 WebGL 降级。

## 本地动作闭环

| ID | 权限 | 状态变化 | 数据 | 接口 | 错误恢复 | 监控 | 测试 |
|---|---|---|---|---|---|---|---|
| ACT-001 | public | focus → main | DOM id | 浏览器 focus | main 缺失时开发测试失败 | 无生产分析 | E2E |
| ACT-002 | public | hash/scroll | anchor map | 浏览器 hash | 无效锚点不渲染 | 无 | unit + E2E |
| ACT-003 | public | open external | validated URL | 浏览器导航 | placeholder 禁用 | 无 | unit + E2E |
| ACT-004 | public | invoke mail/tel | validated contact | OS handler | placeholder 禁用 | 无 | unit + E2E |
| ACT-005 | public | open resume | local/validated URL | 浏览器导航 | 资源缺失禁用 | 无 | unit + E2E |
| ACT-006 | public | playing → paused | media ref | HTMLMediaElement | 控件持续可用 | 无 | E2E |
| ACT-007 | public | scroll → top | `#top` | 浏览器 hash | reduced-motion 即时跳转 | 无 | E2E |

## 错误与空状态

- 内容数据是构建期常量；类型或 manifest 不完整时测试/构建失败。
- 资产缺失不以网络占位图恢复；使用 CSS 表面与文字空状态。
- 真实媒体加载失败时显示封面、错误说明和重试/外链（仅真实合法 URL）。
- 客户端动效异常不能捕获或替换服务端正文。

## 非功能约束

- WCAG 2.2 AA；触控目标 ≥44px；键盘完整；正文对比度 ≥4.5:1。
- 实验室预算：LCP ≤2.5s、CLS ≤0.1、关键交互 ≤200ms。
- Hero 生产海报 ≤250 KB；非首屏媒体 lazy-load；重型动效不在关键渲染路径。
- 仅支持现代常青浏览器；无 JS 保留核心阅读与锚点链接。
- 不收集、发送或持久化用户数据；不需要隐私同意层。
- 本地 Windows 使用 `next build --webpack` 的 WASM 后备；Vercel/Linux 需重新验证原生构建。

## 技术决策

- DEC-002：MCP 不再作为开发阻塞，React Bits 审计透明标为 Web registry。
- DEC-003：静态 App Router，无后台与公开 API。
- DEC-004：CSS/SVG 背景与轨迹，零 React Bits/Motion/GSAP/WebGL。
- DEC-005：集中 token 与坏链接抑制是系统不变量。
