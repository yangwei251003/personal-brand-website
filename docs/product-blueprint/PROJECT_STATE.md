# PROJECT_STATE

- Blueprint version：`1.0.0-hero`
- Last updated：2026-08-31
- Status：Hero Complete — Awaiting User Feedback
- Authority：当前事实、决定摘要、风险、frontier 与下一步最小行动的唯一权威。

## 当前阶段

工程基础、参考研究、React Bits Web 候选审计、视觉选择、资产生产、正式 Hero、自动验收与两轮内部视觉检查均已完成。当前 frontier 是等待用户在本地真实浏览后反馈；在收到反馈前不运行 `grill-me`，也不开发任何正式内页。

## 已确认决策

- npm 11；Node.js 24.15.0。
- Next.js 16.3.3、React 19.2.8、TypeScript 5.9.3、Tailwind CSS 4.3.3。
- App Router、`src/app`、Tailwind v4 PostCSS、暗色单主题、中文默认内容。
- 当前只交付 `/`；未来页面仅写入设计树。
- 所有个人事实集中使用显式 token，占位状态不得生成坏链接。
- 视觉采用 A 约 65%（紫金珍藏馆）、C 约 25%（暖橙成果区）、B 约 10%（中段路径/节点语法）。
- B 只在 `#ai-creation` 至 `#timeline` 使用，不继承蓝紫星空、密集粒子或 HUD。
- 生产实现零 React Bits、零 Motion、零 GSAP、零 WebGL；使用服务端 HTML、CSS、静态 SVG 和一次性 IntersectionObserver 增强。
- 移动端使用独立竖版视觉与“文字在上、视觉在下”构图，不直接 `cover` 桌面 16:9 海报。

## 工具策略调整

shadcn MCP 在本任务中未暴露工具。用户于 2026-08-31 明确要求停止等待并换思路开发。因此：

- 保留完整 `components.json` 与 `@react-bits` registry 配置。
- React Bits 只通过官方 Web registry/GitHub 做透明的候选研究，文档必须标注“非 MCP 审计”。
- 正式界面采用零 React Bits 依赖；保留矩阵作为透明的候选审计证据。
- 禁止声称完成了 shadcn MCP 盘点。

## 当前边界

- 不部署、不推送、不创建正式内页。
- 不接入数据库、CMS、表单后端、分析平台或公开 API。
- 不伪造项目、奖项、指标、视频、联系方式或外部链接。
- Hero 完成后停止；收到实际体验反馈后才运行 `grill-me`。

## 三重审查

- Skeptic：`GO_WITH_GUARDRAILS`。原 React Bits 候选存在持续绘制/逐帧更新风险，已全部退出生产。
- Simplifier：通过。删除 Motion、WebGL、GSAP、滚动 scrub 与持续动画；只保留一次性淡入和 CSS 状态反馈。
- Blind-Handoff：通过。12 区段、未来路由边界、token 不变量、客户端岛与停止条件均有唯一权威来源。

## 风险与条件

- `RISK-001`（已关闭）：已生成独立 4:5 移动 Hero，并在 390×844 验证。
- `RISK-002`：A 容易偏奢侈品广告；用真实占位标签、技术性编号与克制文案校正。
- `RISK-003`：C 的暖橙不可整屏高亮；只作暗茄紫上的局部光场、边缘与成果焦点。
- `RISK-004`：本地 Windows 使用 SWC WASM/Webpack 后备；Vercel/Linux 原生构建待交付时复核。

## 下一步最小行动

用户运行 `npm run dev` 或 `npm run start` 实际浏览首页并提供体验反馈。收到反馈后才启用 `grill-me`，每轮最多三个高影响问题；未获得明确确认，不开发下一正式页面。

## 基础验证

- `npm run lint`：通过。
- `npm run typecheck`：通过。
- `npm run test:unit`：11/11 通过。
- Playwright Chromium E2E：14/14 通过，含桌面/移动 WCAG 2.2 AA、Save-Data 与无持续滚动动画审计。
- `npm run build`：通过，`/`、`/_not-found` 与站点图标均为静态输出。
- 本地实验室快照：LCP 380.0ms、CLS 0.0000、关键交互 7.5ms、初始资源传输 204,570B；完整记录见 `docs/hero/verification.md`。
- 当前 Windows 环境无法加载 Next.js 原生 SWC 二进制，已按 Next 错误提示切换到官方 Webpack/WASM 后备模式；构建会打印警告但成功完成。该问题在正式交付前继续记录并复核，不影响 Vercel 的 Linux 原生构建。
