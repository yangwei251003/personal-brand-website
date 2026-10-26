# 个人品牌网站 · Blueprint Index

- Blueprint version：`1.0.0-hero`
- Last updated：2026-08-31
- Status：Hero Complete — Feedback Gate
- Authority：本文件只负责蓝图导航、门禁与开发入口，不定义产品正文。
- 当前 frontier：等待用户实际浏览反馈；不继续正式内页。

## 权威来源

| 主题 | 唯一权威文档 | 状态 | 依赖/备注 |
|---|---|---|---|
| 项目事实、决定、未决项 | `PROJECT_STATE.md` | Approved | 决定摘要链接 `DECISIONS.md` |
| 产品范围与旅程 | `PRODUCT_BLUEPRINT.md` | Approved | 受众证据见 `../hero/audience-and-content.md` |
| 体验与视觉契约 | `EXPERIENCE_BLUEPRINT.md` | Approved | A 65% + C 25% + B 10% |
| 系统、数据与集成 | `SYSTEM_BLUEPRINT.md` | Approved | 纯静态前端，无后台 |
| 构建切片与验收 | `BUILD_AND_ACCEPTANCE.md` | Approved | 实现与验证基线已冻结 |
| 高影响决定 | `DECISIONS.md` | Approved | DEC-001 至 DEC-006 |

## 证据与探索材料

这些文件保留研究与方案证据；最终约束仍以核心蓝图为准。

| 材料 | 作用 | 状态 |
|---|---|---|
| `../hero/research.md` | 外部案例研究证据 | Complete |
| `../hero/audience-and-content.md` | 受众、区段与真实性证据 | Complete |
| `../hero/visual-directions.md` | 三套视觉探索与资产策略 | Direction Selected |
| `../hero/react-bits-matrix.md` | 官方 Web registry 候选审计，非 MCP | Complete |
| `../hero/asset-manifest.json` | 生成资产来源、权利与状态 | Active |
| `../hero/verification.md` | 自动检查、实验室性能与截图证据 | Complete |
| `../hero/implementation-notes.md` | 结构、动效、替换与交接说明 | Complete |

## 门禁摘要

| 门禁 | 状态 | 证据/条件 |
|---|---|---|
| Product Clarity | Pass | `PRODUCT_BLUEPRINT.md` |
| User Value | Pass | 30 秒扫描与 3–5 分钟深读双路径 |
| Scope Control | Pass | 仅 `/`，未来路由不创建 |
| Experience Coherence | Pass | A/C/B 职责、比例、区段与移动构图已冻结 |
| Accessibility | Pass | Axe 桌面/移动零违规；键盘、reduced-motion 与 Save-Data E2E 通过 |
| Performance | Pass | 本地生产快照 LCP 380ms / CLS 0 / 交互 7.5ms |
| Technical Closure | Pass with known warning | Windows SWC 使用 Webpack/WASM 后备；生产构建通过 |
| Content Truthfulness | Pass | 全部个人事实使用 token，不可导航占位 |

## 开发入口

开发 Agent 依次阅读：

1. `BUILD_AND_ACCEPTANCE.md`
2. `DECISIONS.md`
3. `EXPERIENCE_BLUEPRINT.md`
4. `PRODUCT_BLUEPRINT.md`
5. `SYSTEM_BLUEPRINT.md`
6. `PROJECT_STATE.md`

## Ready 摘要

- Blocking：none。
- Conditional：个人真实内容、真实链接与真实媒体仍由用户后续替换。
- Later：八个正式内页、部署、CMS、表单后端、分析平台。
- 当前交付：12 区段 Hero、占位符契约、本页锚点导航、静态降级、生产资产与自动验收均已完成。
- 三重审查：Skeptic GO_WITH_GUARDRAILS / Simplifier Pass / Blind-Handoff Pass。
