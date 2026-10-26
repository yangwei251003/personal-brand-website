export type PlaceholderKind =
  | "identity"
  | "project"
  | "honor"
  | "timeline"
  | "content"
  | "contact"
  | "link";

export type PlaceholderRaw = `{{${string}}}`;

export interface PlaceholderToken {
  key: string;
  raw: PlaceholderRaw;
  label: string;
  kind: PlaceholderKind;
  status: "unresolved" | "resolved";
}

export interface AnchorLink {
  label: string;
  href: `#${string}`;
  description?: string;
}

export interface ContentLink {
  label: string;
  href: string;
  value?: string;
}

export interface ProjectPreview {
  id: string;
  title: string;
  role: string;
  summary: string;
  outcome: string;
  href: string;
  assetId: string;
  status: "placeholder" | "ready";
}

export interface HonorPreview {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  assetId: string;
  status: "placeholder" | "ready";
}

export type ContentPreviewKind = "blog" | "video" | "gallery";

export interface ContentPreview {
  id: string;
  kind: ContentPreviewKind;
  title: string;
  summary: string;
  href: string;
  assetId: string;
  status: "empty" | "placeholder" | "ready";
  playable?: boolean;
}

export interface AssetSourceRecord {
  path: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
  sha256: string;
}

export interface AssetDerivativeRecord extends AssetSourceRecord {
  quality: number;
  alt: string;
}

export interface AssetRecord {
  id: string;
  type: "image";
  purpose: string;
  sections: string[];
  sourceType: "openai-imagegen";
  creator: string;
  promptRef?: string;
  sourcePrompt?: string;
  generationId: string;
  generatedAt: string;
  licenseId: string;
  licenseUrl: string;
  attribution: string | null;
  source: AssetSourceRecord;
  visualDescription: string;
  alt: string;
  decorative: boolean;
  replacementToken: string | null;
  optimizationStatus:
    | "original-candidate"
    | "original-reference-only"
    | "optimized-production-ready";
  adoptionStatus:
    | "adopted"
    | "adopted-empty-state"
    | "adopted-primary"
    | "reference-only-no-production-binary";
  derivatives: AssetDerivativeRecord[];
}

export type MotionMode = "full" | "reduced" | "static";

export interface MotionPolicy {
  mode: MotionMode;
  reducedMotion: boolean;
  saveData: boolean;
  coarsePointer: boolean;
  webgl: boolean;
  allowContinuousMotion: false;
  allowParallax: false;
}

export interface ProfileContent {
  navigation: {
    brand: string;
    items: AnchorLink[];
    contactAction: AnchorLink;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    tagline: string;
    summary: string;
    ctas: AnchorLink[];
  };
  identity: {
    eyebrow: string;
    title: string;
    intro: string;
    facts: Array<{
      label: string;
      value: string;
    }>;
  };
  projects: ProjectPreview[];
  aiCreation: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      id: "research" | "build" | "visual" | "express";
      index: string;
      title: string;
      description: string;
      href: AnchorLink["href"];
    }>;
  };
  honors: HonorPreview[];
  timeline: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      id: string;
      date: string;
      title: string;
      action: string;
      outcome: string;
      status: "placeholder" | "ready";
    }>;
  };
  blog: ContentPreview[];
  videos: ContentPreview[];
  gallery: ContentPreview[];
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    email: ContentLink;
    phone: ContentLink;
    resume: ContentLink;
    socials: ContentLink[];
  };
  memory: {
    eyebrow: string;
    principle: string;
    backToTop: AnchorLink;
  };
}
