# Build and Acceptance

- Blueprint version：`1.0.0-hero`
- Last updated：2026-08-31
- Status：Executed — Hero Complete
- Authority：实现顺序、测试、发布门禁、完成定义和停止条件的唯一权威。

## 交付策略

- 当前目标：完成可本地生产运行、可访问、可替换个人内容的 `/` 长篇 Hero。
- 首个纵向切片：token/链接安全 → 智能导航 → 电影式首屏 → 静态/reduced-motion 降级。
- 冻结默认：A 65%、C 25%、B 10%；暗色单主题；中文；独立移动构图；零 React Bits/Motion/GSAP/WebGL。
- 不在本轮：正式内页、部署、CMS、表单后端、分析、真实内容填充。

## 纵向任务

| 顺序 | 切片/任务 | 用户价值 | 涉及 ACT/DEC | 前端 | 数据 | 测试 | 完成条件 |
|---:|---|---|---|---|---|---|---|
| 1 | 内容与安全契约 | 任何占位都不误导 | DEC-005 | `PlaceholderLink` | token/types/profile | unit | 唯一性与坏链抑制通过 |
| 2 | 首屏闭环 | 30 秒理解并可导航 | ACT-001/002, DEC-001/004 | nav/hero/CTA | identity | unit + E2E | 无 JS/reduced-motion 可用 |
| 3 | 可信度核心 | 看项目、创作、荣誉与成长 | ACT-003 | sections/cards/path | previews/timeline | E2E | 所有空状态诚实可读 |
| 4 | 内容与联系闭环 | 看持续输出并安全联系 | ACT-004/005/006/007 | media/contact/footer | content/contact | unit + E2E | token 与真实链接分流正确 |
| 5 | 视觉与性能硬化 | 高视觉冲击不牺牲可用性 | DEC-004 | responsive/motion/assets | manifest | screenshots/Lighthouse | 四视口与预算通过 |
| 6 | 独立交付复核 | 新 Agent 可接手 | 全部 | 文档/运行说明 | — | clean build | 无阻塞、已知问题明确 |

## 自动检查

- `npm run lint`
- `npm run typecheck`
- 单元测试：token 唯一性、`isPlaceholder()`、链接抑制、manifest 完整性、MotionPolicy。
- Playwright Chromium：锚点、收缩导航、移动菜单、CTA、焦点顺序、视频状态、reduced-motion、无 WebGL、404、控制台错误。
- `npm run build`、生产启动与依赖/peer 检查。

## 验收场景

| 场景 | Given | When | Then | 恢复/边界 | 自动化层级 |
|---|---|---|---|---|---|
| 首屏加载 | 冷缓存 | 访问 `/` | 身份与 CTA 不等待客户端 JS | 海报失败仍有背景与文字 | E2E + 性能 |
| 跳过导航 | 键盘用户 | 首次按 Tab/Enter | 焦点进入主要内容 | 焦点轮廓可见 | E2E |
| 锚点导航 | 任意视口 | 选择一个导航项 | 到正确区段且不被 sticky nav 遮挡 | reduced-motion 不平滑滚动 | E2E |
| 占位联系 | token 未替换 | 激活邮件/电话/简历状态 | 不导航并说明待补充 | 无空 href | unit + E2E |
| 真实链接 | token 已替换且 URL 合法 | 激活链接 | 安全打开正确目标 | 非法 URL 在开发期失败 | unit + E2E |
| 动效降级 | reduced-motion/Save-Data | 浏览全页 | 无循环、视差或路径绘制；内容完整 | 静态首帧 | E2E |
| 无视频 | 视频数组为空 | 到达视频区 | 无播放按钮，显示诚实空状态 | 无伪缩略图事实 | E2E |
| 404 | 访问不存在路由 | 页面响应 | Next 404，不创建未来页 | 返回首页入口 | E2E |

## 固定视口与视觉审查

- 1440×900
- 1024×768
- 768×1024
- 390×844

第一轮：品牌、信息层级、构图、色彩连续性、动效冲突。  
第二轮：响应式、性能、无障碍、token 替换便利性。  
最后由独立 Agent 做交付复核。

## 发布门禁

| 门禁 | 阻塞条件 |
|---|---|
| 内容真实性 | 任何伪造事实、坏链接或可点击假媒体 |
| 无障碍 | 键盘不可达、低对比、不可关闭高强度动效、焦点丢失 |
| 性能 | LCP >2.5s、CLS >0.1、关键交互 >200ms，且无合理修复/记录 |
| 资产 | Hero 海报 >250 KB、生产目录含未引用候选或许可证缺失 |
| 稳定性 | lint/typecheck/unit/E2E/build 任一失败或控制台错误 |
| 范围 | 创建正式内页、后台或部署 |

## 交接检查

- [x] 无 Blocking 未决项。
- [x] 首个纵向切片无需重新做关键产品决定即可执行。
- [x] Skeptic / Simplifier / Blind-Handoff 审查通过。
- [x] 链接、状态、数据、错误、媒体和测试均有闭环。
- [x] Conditional 默认及重开条件已冻结。

## 三重审查结论

- Skeptic：`GO_WITH_GUARDRAILS`；持续动画、逐帧 React 更新、WebGL 与原始 React Bits 均被否决。
- Simplifier：删除 Motion、GSAP、WebGL、滚动 scrub 和无限动画后，核心价值不受损。
- Blind-Handoff：12 区段、A/C/B 职责、token、客户端岛、测试与停止条件均可由新 Agent 直接执行。

## 完成与停止条件

Hero 本地交付、验证与文档完成后立即停止。等待用户实际浏览并提供反馈；届时才运行 `grill-me`，每轮最多三个高影响问题。没有用户明确确认，不开发下一正式页面。

## 执行结果

- 六个纵向任务均已完成。
- `lint`、`typecheck`、11 项单元测试、14 项 Playwright/Axe E2E 与 production build 全部通过。
- 1440×900、1024×768、768×1024、390×844 全页截图与四个关键区段截图已输出到 `docs/hero/screenshots/`。
- 实验室性能与资源预算均通过，详见 `docs/hero/verification.md`。
- 当前状态已进入停止闸门：等待用户实际体验反馈。
