import { PLACEHOLDERS as T } from "@/content/placeholders";
import type { ProfileContent } from "@/content/types";

export const profileContent = {
  navigation: {
    brand: T.DISPLAY_NAME.raw,
    items: [
      { label: "项目", href: "#projects" },
      { label: "AI 创作", href: "#ai-creation" },
      { label: "成长", href: "#timeline" },
      { label: "记录", href: "#blog" },
    ],
    contactAction: { label: "联系我", href: "#contact" },
  },
  hero: {
    eyebrow: "DEVELOPMENT DEMO / 占位内容演示 · 开发中",
    name: T.DISPLAY_NAME.raw,
    role: T.ROLE_TITLE.raw,
    tagline: T.HERO_TAGLINE.raw,
    summary: T.HERO_SUMMARY.raw,
    ctas: [
      {
        label: "看精选项目",
        href: "#projects",
        description: "前往本页的精选项目区",
      },
      {
        label: "沿成长轨迹",
        href: "#timeline",
        description: "前往本页的成长时间线",
      },
      {
        label: "与我联系",
        href: "#contact",
        description: "前往本页的联系方式",
      },
    ],
  },
  identity: {
    eyebrow: "IDENTITY / 当前坐标",
    title: "把身份放在正在发生的事情里",
    intro:
      "这一段只承载可验证的当前状态、兴趣与工作方法；替换占位内容后，它会成为浏览者理解你的最短路径。",
    facts: [
      { label: "当前阶段", value: T.CURRENT_STAGE.raw },
      { label: "正在关注", value: T.CURRENT_FOCUS.raw },
      { label: "兴趣方向", value: T.INTERESTS_SUMMARY.raw },
      { label: "工作方法", value: T.WORK_METHOD.raw },
    ],
  },
  projects: [
    {
      id: "project-01",
      title: T.PROJECT_01_TITLE.raw,
      role: T.PROJECT_01_ROLE.raw,
      summary: T.PROJECT_01_SUMMARY.raw,
      outcome: T.PROJECT_01_OUTCOME.raw,
      href: T.PROJECT_01_URL.raw,
      assetId: "project-system",
      status: "placeholder",
    },
    {
      id: "project-02",
      title: T.PROJECT_02_TITLE.raw,
      role: T.PROJECT_02_ROLE.raw,
      summary: T.PROJECT_02_SUMMARY.raw,
      outcome: T.PROJECT_02_OUTCOME.raw,
      href: T.PROJECT_02_URL.raw,
      assetId: "project-research",
      status: "placeholder",
    },
    {
      id: "project-03",
      title: T.PROJECT_03_TITLE.raw,
      role: T.PROJECT_03_ROLE.raw,
      summary: T.PROJECT_03_SUMMARY.raw,
      outcome: T.PROJECT_03_OUTCOME.raw,
      href: T.PROJECT_03_URL.raw,
      assetId: "project-visual",
      status: "placeholder",
    },
  ],
  aiCreation: {
    eyebrow: "AI CREATION / 四种动作",
    title: "从研究到表达，让成长留下清晰轨迹",
    intro:
      "四个入口都留在这一页，并指向能够被查看的过程或成果；它们不会提前创建尚未开发的内页。",
    items: [
      {
        id: "research",
        index: "01",
        title: "研究",
        description: "把问题拆成假设、证据与可复查的结论。",
        href: "#blog",
      },
      {
        id: "build",
        index: "02",
        title: "构建",
        description: "把想法压缩为能够运行、测试和迭代的作品。",
        href: "#projects",
      },
      {
        id: "visual",
        index: "03",
        title: "视觉",
        description: "把抽象概念组织成有节奏、可理解的视觉语言。",
        href: "#gallery",
      },
      {
        id: "express",
        index: "04",
        title: "表达",
        description: "用文字与影像说明判断、过程和下一步。",
        href: "#videos",
      },
    ],
  },
  honors: [
    {
      id: "honor-01",
      title: T.HONOR_01_TITLE.raw,
      issuer: T.HONOR_01_ISSUER.raw,
      date: T.HONOR_01_DATE.raw,
      description: T.HONOR_01_DESCRIPTION.raw,
      assetId: "honor-empty-showcase",
      status: "placeholder",
    },
    {
      id: "honor-02",
      title: T.HONOR_02_TITLE.raw,
      issuer: T.HONOR_02_ISSUER.raw,
      date: T.HONOR_02_DATE.raw,
      description: T.HONOR_02_DESCRIPTION.raw,
      assetId: "honor-empty-showcase",
      status: "placeholder",
    },
    {
      id: "honor-03",
      title: T.HONOR_03_TITLE.raw,
      issuer: T.HONOR_03_ISSUER.raw,
      date: T.HONOR_03_DATE.raw,
      description: T.HONOR_03_DESCRIPTION.raw,
      assetId: "honor-empty-showcase",
      status: "placeholder",
    },
  ],
  timeline: {
    eyebrow: "GROWTH PATH / 成长轨迹",
    title: "节点不是装饰，而是每一次转折的证据",
    intro:
      "时间、行动与结果都保持显式占位；只有在事实被补齐后，这条轨迹才会成为个人经历。",
    items: [
      {
        id: "timeline-01",
        date: T.TIMELINE_01_DATE.raw,
        title: T.TIMELINE_01_TITLE.raw,
        action: T.TIMELINE_01_ACTION.raw,
        outcome: T.TIMELINE_01_OUTCOME.raw,
        status: "placeholder",
      },
      {
        id: "timeline-02",
        date: T.TIMELINE_02_DATE.raw,
        title: T.TIMELINE_02_TITLE.raw,
        action: T.TIMELINE_02_ACTION.raw,
        outcome: T.TIMELINE_02_OUTCOME.raw,
        status: "placeholder",
      },
      {
        id: "timeline-03",
        date: T.TIMELINE_03_DATE.raw,
        title: T.TIMELINE_03_TITLE.raw,
        action: T.TIMELINE_03_ACTION.raw,
        outcome: T.TIMELINE_03_OUTCOME.raw,
        status: "placeholder",
      },
    ],
  },
  blog: [
    {
      id: "blog-01",
      kind: "blog",
      title: T.BLOG_01_TITLE.raw,
      summary: T.BLOG_01_SUMMARY.raw,
      href: T.BLOG_01_URL.raw,
      assetId: "blog-editorial-placeholder",
      status: "placeholder",
    },
  ],
  videos: [
    {
      id: "video-01",
      kind: "video",
      title: T.VIDEO_01_TITLE.raw,
      summary: T.VIDEO_01_SUMMARY.raw,
      href: T.VIDEO_01_URL.raw,
      assetId: "video-stage-placeholder",
      status: "empty",
      playable: false,
    },
  ],
  gallery: [
    {
      id: "gallery-01",
      kind: "gallery",
      title: T.GALLERY_01_TITLE.raw,
      summary: T.GALLERY_01_SUMMARY.raw,
      href: T.GALLERY_01_URL.raw,
      assetId: "gallery-frame-placeholder",
      status: "placeholder",
    },
  ],
  contact: {
    eyebrow: "CONTACT / 下一次共同创造",
    title: "让一次具体的交流，成为下一段轨迹的起点",
    intro:
      "联系方式与简历在替换为真实内容前会保持不可导航，避免误导或产生坏链接。",
    email: {
      label: "电子邮件",
      value: T.EMAIL_ADDRESS.raw,
      href: `mailto:${T.EMAIL_ADDRESS.raw}`,
    },
    phone: {
      label: "电话",
      value: T.PHONE_NUMBER.raw,
      href: `tel:${T.PHONE_NUMBER.raw}`,
    },
    resume: {
      label: "查看简历",
      href: T.RESUME_URL.raw,
    },
    socials: [
      {
        label: T.SOCIAL_01_LABEL.raw,
        href: T.SOCIAL_01_URL.raw,
      },
      {
        label: T.SOCIAL_02_LABEL.raw,
        href: T.SOCIAL_02_URL.raw,
      },
    ],
  },
  memory: {
    eyebrow: "ONE THING TO REMEMBER",
    principle: T.PERSONAL_PRINCIPLE.raw,
    backToTop: {
      label: "回到开场",
      href: "#top",
      description: "返回页面顶部",
    },
  },
} as const satisfies ProfileContent;
