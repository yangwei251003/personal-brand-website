import type { PlaceholderToken } from "@/content/types";

function token(
  key: string,
  label: string,
  kind: PlaceholderToken["kind"],
): PlaceholderToken {
  return {
    key,
    raw: `{{${key}}}`,
    label,
    kind,
    status: "unresolved",
  };
}

export const PLACEHOLDERS = {
  DISPLAY_NAME: token("DISPLAY_NAME", "姓名", "identity"),
  ROLE_TITLE: token("ROLE_TITLE", "当前定位", "identity"),
  HERO_TAGLINE: token("HERO_TAGLINE", "首屏主张", "identity"),
  HERO_SUMMARY: token("HERO_SUMMARY", "首屏简介", "identity"),
  CURRENT_STAGE: token("CURRENT_STAGE", "当前阶段", "identity"),
  CURRENT_FOCUS: token("CURRENT_FOCUS", "当前关注", "identity"),
  INTERESTS_SUMMARY: token("INTERESTS_SUMMARY", "兴趣方向", "identity"),
  WORK_METHOD: token("WORK_METHOD", "工作方法", "identity"),

  PROJECT_01_TITLE: token("PROJECT_01_TITLE", "项目一名称", "project"),
  PROJECT_01_ROLE: token("PROJECT_01_ROLE", "项目一职责", "project"),
  PROJECT_01_SUMMARY: token("PROJECT_01_SUMMARY", "项目一简介", "project"),
  PROJECT_01_OUTCOME: token("PROJECT_01_OUTCOME", "项目一结果", "project"),
  PROJECT_01_URL: token("PROJECT_01_URL", "项目一链接", "link"),
  PROJECT_02_TITLE: token("PROJECT_02_TITLE", "项目二名称", "project"),
  PROJECT_02_ROLE: token("PROJECT_02_ROLE", "项目二职责", "project"),
  PROJECT_02_SUMMARY: token("PROJECT_02_SUMMARY", "项目二简介", "project"),
  PROJECT_02_OUTCOME: token("PROJECT_02_OUTCOME", "项目二结果", "project"),
  PROJECT_02_URL: token("PROJECT_02_URL", "项目二链接", "link"),
  PROJECT_03_TITLE: token("PROJECT_03_TITLE", "项目三名称", "project"),
  PROJECT_03_ROLE: token("PROJECT_03_ROLE", "项目三职责", "project"),
  PROJECT_03_SUMMARY: token("PROJECT_03_SUMMARY", "项目三简介", "project"),
  PROJECT_03_OUTCOME: token("PROJECT_03_OUTCOME", "项目三结果", "project"),
  PROJECT_03_URL: token("PROJECT_03_URL", "项目三链接", "link"),

  HONOR_01_TITLE: token("HONOR_01_TITLE", "荣誉一名称", "honor"),
  HONOR_01_ISSUER: token("HONOR_01_ISSUER", "荣誉一颁发方", "honor"),
  HONOR_01_DATE: token("HONOR_01_DATE", "荣誉一时间", "honor"),
  HONOR_01_DESCRIPTION: token("HONOR_01_DESCRIPTION", "荣誉一说明", "honor"),
  HONOR_02_TITLE: token("HONOR_02_TITLE", "荣誉二名称", "honor"),
  HONOR_02_ISSUER: token("HONOR_02_ISSUER", "荣誉二颁发方", "honor"),
  HONOR_02_DATE: token("HONOR_02_DATE", "荣誉二时间", "honor"),
  HONOR_02_DESCRIPTION: token("HONOR_02_DESCRIPTION", "荣誉二说明", "honor"),
  HONOR_03_TITLE: token("HONOR_03_TITLE", "荣誉三名称", "honor"),
  HONOR_03_ISSUER: token("HONOR_03_ISSUER", "荣誉三颁发方", "honor"),
  HONOR_03_DATE: token("HONOR_03_DATE", "荣誉三时间", "honor"),
  HONOR_03_DESCRIPTION: token("HONOR_03_DESCRIPTION", "荣誉三说明", "honor"),

  TIMELINE_01_DATE: token("TIMELINE_01_DATE", "轨迹一时间", "timeline"),
  TIMELINE_01_TITLE: token("TIMELINE_01_TITLE", "轨迹一标题", "timeline"),
  TIMELINE_01_ACTION: token("TIMELINE_01_ACTION", "轨迹一行动", "timeline"),
  TIMELINE_01_OUTCOME: token("TIMELINE_01_OUTCOME", "轨迹一结果", "timeline"),
  TIMELINE_02_DATE: token("TIMELINE_02_DATE", "轨迹二时间", "timeline"),
  TIMELINE_02_TITLE: token("TIMELINE_02_TITLE", "轨迹二标题", "timeline"),
  TIMELINE_02_ACTION: token("TIMELINE_02_ACTION", "轨迹二行动", "timeline"),
  TIMELINE_02_OUTCOME: token("TIMELINE_02_OUTCOME", "轨迹二结果", "timeline"),
  TIMELINE_03_DATE: token("TIMELINE_03_DATE", "轨迹三时间", "timeline"),
  TIMELINE_03_TITLE: token("TIMELINE_03_TITLE", "轨迹三标题", "timeline"),
  TIMELINE_03_ACTION: token("TIMELINE_03_ACTION", "轨迹三行动", "timeline"),
  TIMELINE_03_OUTCOME: token("TIMELINE_03_OUTCOME", "轨迹三结果", "timeline"),

  BLOG_01_TITLE: token("BLOG_01_TITLE", "文章标题", "content"),
  BLOG_01_SUMMARY: token("BLOG_01_SUMMARY", "文章摘要", "content"),
  BLOG_01_URL: token("BLOG_01_URL", "文章链接", "link"),
  VIDEO_01_TITLE: token("VIDEO_01_TITLE", "视频标题", "content"),
  VIDEO_01_SUMMARY: token("VIDEO_01_SUMMARY", "视频摘要", "content"),
  VIDEO_01_URL: token("VIDEO_01_URL", "视频链接", "link"),
  GALLERY_01_TITLE: token("GALLERY_01_TITLE", "照片组标题", "content"),
  GALLERY_01_SUMMARY: token("GALLERY_01_SUMMARY", "照片组说明", "content"),
  GALLERY_01_URL: token("GALLERY_01_URL", "照片组链接", "link"),

  EMAIL_ADDRESS: token("EMAIL_ADDRESS", "电子邮箱", "contact"),
  PHONE_NUMBER: token("PHONE_NUMBER", "电话号码", "contact"),
  RESUME_URL: token("RESUME_URL", "简历链接", "link"),
  SOCIAL_01_LABEL: token("SOCIAL_01_LABEL", "社交平台一名称", "contact"),
  SOCIAL_01_URL: token("SOCIAL_01_URL", "社交平台一链接", "link"),
  SOCIAL_02_LABEL: token("SOCIAL_02_LABEL", "社交平台二名称", "contact"),
  SOCIAL_02_URL: token("SOCIAL_02_URL", "社交平台二链接", "link"),
  PERSONAL_PRINCIPLE: token("PERSONAL_PRINCIPLE", "个人原则", "identity"),
} as const satisfies Record<string, PlaceholderToken>;

export type PlaceholderKey = keyof typeof PLACEHOLDERS;

export const PLACEHOLDER_LIST = Object.values(PLACEHOLDERS);
