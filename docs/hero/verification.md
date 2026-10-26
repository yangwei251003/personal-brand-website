# Hero 验证记录

验证日期：2026-08-31  
环境：Windows / Node.js 24.15.0 / npm 11.12.1 / Chrome / Next.js production build  
性质：以下性能数字均为本机实验室快照，不代表真实用户现场数据。

完成审计：当前工作区重新执行完整 `npm test`，11 项单元测试、production build 与 14 项 Playwright/Axe E2E 全部通过；复跑快照为 LCP 308ms、CLS 0、交互 5.1ms、传输 204,570B。下表保留此前较保守的 380ms / 7.5ms 交付基线。

## 自动检查

| 检查 | 结果 |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run test:unit` | 11/11 Pass |
| Playwright Chromium | 14/14 Pass |
| Axe WCAG 2.2 AA | 桌面与 390px 移动端均为 0 violations |
| `npm run build` | Pass，静态输出 `/` 与 `/_not-found` |
| 生产启动 | Pass |
| `npm ci --dry-run --ignore-scripts` | Pass，锁文件可重建 |

单元覆盖：token 唯一性、`isPlaceholder()`、坏链接抑制、合法链接、资产清单嵌套契约/哈希/字节完整性、Hero 图片预算、动效降级策略。

E2E 覆盖：完整区段、未来路由抑制、首屏 CTA、收缩导航、skip link、焦点轮廓、44px 触控目标、移动菜单、Escape 回焦、reduced-motion、Save-Data、无持续滚动动画、无 WebGL、非首屏图片懒加载、空视频、404、控制台错误、四视口截图和实验室性能。

## 实验室性能快照

| 指标 | 测量值 | 门槛 | 结果 |
|---|---:|---:|---|
| LCP | 380.0ms | ≤2,500ms | Pass |
| CLS | 0.0000 | ≤0.1 | Pass |
| 菜单关键交互 | 7.5ms | ≤200ms | Pass |
| 初始资源传输 | 204,570B | ≤600,000B | Pass |
| 页面自有客户端 JS | 1,276B gzip | ≤30KB gzip | Pass |
| 单一页面客户端 chunk | 1,276B gzip | ≤10KB gzip | Pass |
| 页面 CSS | 8,355B gzip | ≤35KB gzip | Pass |

图片预算：

- 桌面 Hero：39,748B AVIF / 50,584B WebP。
- 移动 Hero：16,748B AVIF / 22,030B WebP。
- 全部生产图片单文件均不超过 50,584B。

## 响应式与视觉证据

- [1440×900 全页](./screenshots/desktop-1440x900-full.png)
- [1024×768 全页](./screenshots/desktop-1024x768-full.png)
- [768×1024 全页](./screenshots/tablet-768x1024-full.png)
- [390×844 全页](./screenshots/mobile-390x844-full.png)
- [首屏](./screenshots/section-hero.png)
- [精选项目](./screenshots/section-projects.png)
- [成长轨迹](./screenshots/section-timeline.png)
- [联系区](./screenshots/section-contact.png)

768×1024 全页图最终高度为 16,347px，低于常见 16,384px 捕获边界；局部截图已移除 skip link 与固定导航的采集伪影。

## 两轮视觉审查与独立复核

- 第一轮（品牌/信息层级/构图/动效冲突）：GO。A 控制首屏、身份和项目；C 在成果区升温；B 只保留中段稀疏路径语法。
- 第二轮（响应式/性能/无障碍/占位替换）：GO。768px 素材断点、Save-Data、图片懒加载、暖色对比度与占位简历状态均已复核。
- 独立品牌复签：GO；未发现新的视觉或真实性阻塞。
- 独立性能与无障碍复签：GO；无运行时、性能或 WCAG 自动验收阻塞。
- 独立 Blind-Handoff 复签：GO；权威文档、manifest 契约、范围边界与停止闸门一致。

## 已知问题

- 当前 Windows 主机无法加载 Next.js 原生 SWC 二进制，Next 会打印警告并使用 Webpack/WASM 后备；构建、启动与全部测试均成功。Vercel/Linux 原生构建需要在未来部署阶段复核。
- `node_modules` 中两个资产编码期可选 helper 的顶层物理副本被 npm 标记为 extraneous；它们不是项目顶层声明，生产依赖、构建与锁文件 dry-run 均通过。按用户要求不再为环境残留耗时清理。
- 页面仍展示显式 `{{TOKEN}}`，这是内容真实性机制，不是遗漏。替换真实内容后需重新运行整套验收。
- 自动审计只能覆盖部分 WCAG；实际上线前仍建议使用 NVDA 做一次真人屏幕阅读器走查。
