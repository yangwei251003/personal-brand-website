# 来源与许可范围

本目录保留独立 `personal-brand-website` 的长篇主页实现与设计记录，自有代码/文档开放 MIT。它与“暮色金工”网页同属作品集题材，但布局、内容模型、交互及原始资产分别保留。

## 同名技能

本机 Personal Homepage Skill 为 **Non-Commercial**（Copyright 2026 powerycy）；本仓库不捆绑该 Skill、模板、提示词或预设，也不将其改授 MIT。此次对网页与该 Skill 模板的规范化源码比较未发现整文件匹配，该结果不是对所有原创性的法律认证。以后引入实际技能材料应保留其归属与非商业条款。

## 图像

`docs/hero/visuals/` 为原有 Imagegen 抽象母版，`public/assets/hero/` 为选用的 AVIF/WebP 派生。逐图生成标识、用途、尺寸、哈希和 [OpenAI 适用条款](https://openai.com/policies/terms-of-use/) 链接在 `docs/hero/asset-manifest.json`。图像是抽象身份/作品/校园示意，不是真人、真实项目效果或获奖证明。清单 encoder.version 属于原始编码历史。

`docs/images/preview-*.png` 为本次本地静态子路径的真实截图。`docs/hero/screenshots/` 保留对应源码阶段截图；其演示 token 不构成作者真实履历。没有把 AI 示意图称为运行截图。

## 依赖与字体

Next.js、React 等保留原协议。`licenses/NPM_NOTICES.md` 保存本机生产图与嵌入 LICENSE/COPYING/NOTICE 原文；缺单独条款的 marker/Next 子包明确记录同源上游完整文本。其他平台包安装后仍遵守各自随包条款，不上传依赖二进制/缓存。

页面使用系统字体栈，不捆绑未知字体、照片、真人肖像、视频或模型文件。没有 React Bits、GSAP、Three/R3F、OGL 或 WebGPU 运行库。
