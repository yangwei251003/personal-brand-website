# Decisions

- Blueprint version：`1.0.0-hero`
- Last updated：2026-08-31
- Status：Approved
- Authority：跨领域、高影响决定的唯一权威；被废弃决定保留历史。

| ID | 状态 | 决定 | 选择理由 | 被否方案 | 影响范围 | 重开条件 | 日期 |
|---|---|---|---|---|---|---|---|
| DEC-001 | Approved | A 紫金数字珍藏馆为主；C 暖橙用于成果高潮；B 节点轨迹用于向下滚动连接 | 用户明确选择，兼顾品牌高级感、成长主题与成果温度 | 纯 A、纯 B、纯 C | Experience、资产、Hero 12 区段 | 用户体验后明确要求改变主方向 | 2026-08-31 |
| DEC-002 | Approved | shadcn MCP 不再阻塞；React Bits 只做官方 Web registry 审计并如实标注 | 用户要求停止耗时并换思路开发 | 继续重启等待、伪称 MCP 完成 | State、研究、组件选择 | MCP 在未来任务稳定可用且用户要求重新审计 | 2026-08-31 |
| DEC-003 | Approved | Hero 为静态 App Router 页面，无后台、CMS、分析或公开 API | 当前旅程全部可在浏览器闭环，降低复杂度与隐私风险 | 提前接入后端/CMS | Product、System、Build | 用户提出真实数据维护或提交需求 | 2026-08-31 |
| DEC-004 | Approved | CSS/SVG/生成图承担背景与轨迹；零 React Bits、零 Motion、零 GSAP、零 WebGL、零滚动劫持 | 源码级复核发现持续绘制与逐帧状态更新风险；静态优先仍能达到批准视觉 | ShinyText、SpotlightCard、StarBorder 原组件；OGL/Three；GSAP pin | Experience、System、React Bits | 静态方案经真实体验证明无法达到核心价值，且新方案具备可测量预算与等价降级 | 2026-08-31 |
| DEC-005 | Approved | 全部个人事实集中 token 化；未解析链接与媒体必须禁用 | 禁止假履历、坏链接和伪播放行为 | 合理猜测、临时假数据、空 href | Content、System、Tests | 用户提供并确认真实内容 | 2026-08-31 |
| DEC-006 | Approved | 桌面 Hero 与移动 Hero 使用独立构图；移动端文字在上、视觉在下 | 16:9 母版在 390×844 `cover` 时只能保留约 26% 原图宽度 | 单一桌面图盲裁、CSS background cover | Assets、Experience、Performance | 新生成的响应式单图可同时满足主体保留与 ≤110KB 预算 | 2026-08-31 |

## 变更记录

| 日期 | 决定 | 旧结论 | 新结论 | 传播结果 |
|---|---|---|---|---|
| 2026-08-31 | DEC-002 | shadcn MCP 是生产编码硬闸门 | 用户授权 Web registry/自研替代路线 | State、Index、研究矩阵与系统边界已更新 |
| 2026-08-31 | DEC-001 | 三套方向待选 | A 主 + C 成果 + B 下行轨迹 | Experience、资产计划与实现顺序已更新 |
