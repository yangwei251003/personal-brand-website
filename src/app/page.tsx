import { publicAsset } from "@/lib/public-asset";
import { GrowthPath } from "@/components/growth-path";
import { PageEnhancer } from "@/components/page-enhancer";
import { PlaceholderLink } from "@/components/placeholder-link";
import { SectionIntro } from "@/components/section-intro";
import { SmartNav } from "@/components/smart-nav";
import { profileContent } from "@/content/profile";

const productionAssets = {
  heroDesktop: {
    avif: publicAsset("/assets/hero/hero-desktop.avif"),
    webp: publicAsset("/assets/hero/hero-desktop.webp"),
  },
  heroMobile: {
    avif: publicAsset("/assets/hero/hero-mobile.avif"),
    webp: publicAsset("/assets/hero/hero-mobile.webp"),
  },
  avatar: {
    avif: publicAsset("/assets/hero/avatar-identity.avif"),
    webp: publicAsset("/assets/hero/avatar-identity.webp"),
  },
  projects: {
    "project-system": publicAsset("/assets/hero/project-system"),
    "project-research": publicAsset("/assets/hero/project-research"),
    "project-visual": publicAsset("/assets/hero/project-visual"),
  },
  honor: {
    avif: publicAsset("/assets/hero/honor-showcase.avif"),
    webp: publicAsset("/assets/hero/honor-showcase.webp"),
  },
  blog: {
    avif: publicAsset("/assets/hero/blog-placeholder.avif"),
    webp: publicAsset("/assets/hero/blog-placeholder.webp"),
  },
  video: {
    avif: publicAsset("/assets/hero/video-placeholder.avif"),
    webp: publicAsset("/assets/hero/video-placeholder.webp"),
  },
  gallery: {
    avif: publicAsset("/assets/hero/gallery-placeholder.avif"),
    webp: publicAsset("/assets/hero/gallery-placeholder.webp"),
  },
} as const;

function TokenText({ children }: { children: string }) {
  return <span className="token-text">{children}</span>;
}

function ProjectImage({
  assetId,
  alt,
}: {
  assetId: keyof typeof productionAssets.projects;
  alt: string;
}) {
  const base = productionAssets.projects[assetId];

  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <img
        src={`${base}.webp`}
        width="960"
        height="720"
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export default function Home() {
  const content = profileContent;
  const navigationItems = [
    ...content.navigation.items,
    content.navigation.contactAction,
  ];
  const blog = content.blog[0];
  const video = content.videos[0];
  const gallery = content.gallery[0];

  return (
    <div id="top" className="page-shell">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <SmartNav brand={content.navigation.brand} items={navigationItems} />
      <PageEnhancer />

      <main id="main-content" tabIndex={-1}>
        <section id="hero" className="hero-section" aria-labelledby="hero-title">
          <div className="hero-halo hero-halo-one" aria-hidden="true" />
          <div className="hero-halo hero-halo-two" aria-hidden="true" />
          <div className="section-shell hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="hero-title" className="display-title">
                <span className="hero-name">{content.hero.name}</span>
                <span className="hero-role">{content.hero.role}</span>
              </h1>
              <p className="hero-tagline">
                <TokenText>{content.hero.tagline}</TokenText>
              </p>
              <p className="lead-copy">
                <TokenText>{content.hero.summary}</TokenText>
              </p>
              <div className="button-row hero-actions" aria-label="首屏快速入口">
                {content.hero.ctas.map((cta, index) => (
                  <a
                    className={index === 0 ? "button button-primary" : "button button-quiet"}
                    href={cta.href}
                    key={cta.href}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>

            <figure className="hero-visual" data-reveal>
              <picture className="hero-picture">
                <source
                  media="(max-width: 768px)"
                  srcSet={productionAssets.heroMobile.avif}
                  type="image/avif"
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={productionAssets.heroMobile.webp}
                  type="image/webp"
                />
                <source srcSet={productionAssets.heroDesktop.avif} type="image/avif" />
                <img
                  src={productionAssets.heroDesktop.webp}
                  width="1600"
                  height="900"
                  alt=""
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              <figcaption>
                <span>01 / HERO</span>
                <span>紫金数字珍藏馆</span>
              </figcaption>
            </figure>

            <div className="hero-index" aria-hidden="true">
              <span>SCROLL TO EXPLORE</span>
              <span className="hero-index-line" />
            </div>
          </div>
        </section>

        <section
          id="identity"
          className="content-section identity-section"
          aria-labelledby="identity-title"
        >
          <div className="section-shell">
            <header className="identity-heading" data-reveal>
              <div>
                <p className="eyebrow">{content.identity.eyebrow}</p>
                <h2 id="identity-title">{content.identity.title}</h2>
              </div>
              <p>{content.identity.intro}</p>
            </header>

            <div className="identity-layout">
              <figure className="identity-portrait media-frame" data-reveal>
                <picture>
                  <source srcSet={productionAssets.avatar.avif} type="image/avif" />
                  <img
                    src={productionAssets.avatar.webp}
                    width="640"
                    height="640"
                    alt="等待替换为个人头像的抽象身份视觉"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="identity-monogram" aria-hidden="true">
                  ID
                </div>
                <figcaption>抽象身份占位视觉 · 不代表真实人物</figcaption>
              </figure>

              <div className="identity-facts" data-reveal>
                {content.identity.facts.map((fact, index) => (
                  <article key={fact.label}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{fact.label}</h3>
                    <TokenText>{fact.value}</TokenText>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="content-section projects-section"
          aria-labelledby="projects-title"
        >
          <div className="section-shell">
            <SectionIntro
              id="projects-title"
              index="02"
              eyebrow="SELECTED PROJECTS"
              title="作品不是陈列品，是判断与行动的证据"
              description="三个槽位分别承载系统构建、研究过程与视觉表达。真实内容补齐前，所有外链保持关闭。"
            />
            <div className="project-grid">
              {content.projects.map((project, index) => (
                <article
                  className={`project-card surface project-card-${index + 1}`}
                  key={project.id}
                  data-reveal
                >
                  <div className="project-media media-frame">
                    <ProjectImage
                      assetId={project.assetId as keyof typeof productionAssets.projects}
                      alt=""
                    />
                    <div className="media-shade" aria-hidden="true" />
                    <div className="media-label" aria-hidden="true">
                      <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
                      <span>{project.status.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="project-copy">
                    <p>{project.role}</p>
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <dl>
                      <div>
                        <dt>结果证据</dt>
                        <dd>{project.outcome}</dd>
                      </div>
                    </dl>
                    <PlaceholderLink
                      href={project.href}
                      label={`查看项目：${project.title}`}
                      className="project-link"
                    >
                      查看项目
                    </PlaceholderLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="growth-corridor">
          <GrowthPath />

          <section
            id="ai-creation"
            className="content-section creation-section"
            aria-labelledby="creation-title"
          >
            <div className="section-shell">
              <SectionIntro
                id="creation-title"
                index="03"
                eyebrow={content.aiCreation.eyebrow}
                title={content.aiCreation.title}
                description={content.aiCreation.intro}
              />
              <div className="creation-list">
                {content.aiCreation.items.map((item) => (
                  <a className="creation-row" href={item.href} key={item.id} data-reveal>
                    <span>{item.index}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="creation-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section
            id="honors"
            className="content-section honors-section"
            aria-labelledby="honors-title"
          >
            <div className="section-shell">
              <SectionIntro
                id="honors-title"
                index="04"
                eyebrow="HONORS / 成果展柜"
                title="让成果被看见，也让空白保持诚实"
                description="展柜已经就位，但奖项名称、颁发方和时间仍等待真实内容。暖色只在成果出现的地方升温。"
                warm
              />
              <div className="honors-layout">
                <figure className="honor-showcase media-frame" data-reveal>
                  <picture>
                    <source srcSet={productionAssets.honor.avif} type="image/avif" />
                    <img
                      src={productionAssets.honor.webp}
                      width="1536"
                      height="1024"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="media-shade" aria-hidden="true" />
                  <figcaption>等待真实成果入柜</figcaption>
                </figure>

                <div className="honor-list" data-reveal>
                  {content.honors.map((honor, index) => (
                    <article key={honor.id}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <p>{honor.date}</p>
                        <h3>{honor.title}</h3>
                        <p>{honor.issuer}</p>
                        <p>{honor.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="timeline"
            className="content-section timeline-section"
            aria-labelledby="timeline-title"
          >
            <div className="section-shell">
              <SectionIntro
                id="timeline-title"
                index="05"
                eyebrow={content.timeline.eyebrow}
                title={content.timeline.title}
                description={content.timeline.intro}
                warm
              />
              <ol className="timeline-list">
                {content.timeline.items.map((item, index) => (
                  <li key={item.id} data-reveal>
                    <div className="timeline-marker" aria-hidden="true">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="timeline-date">{item.date}</p>
                    <div className="timeline-copy">
                      <h3>{item.title}</h3>
                      <dl>
                        <div>
                          <dt>行动</dt>
                          <dd>{item.action}</dd>
                        </div>
                        <div>
                          <dt>结果</dt>
                          <dd>{item.outcome}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>

        <section
          id="blog"
          className="content-section blog-section"
          aria-labelledby="blog-title"
        >
          <div className="section-shell">
            <SectionIntro
              id="blog-title"
              index="06"
              eyebrow="NOTES / 博客预览"
              title="把尚未定型的判断，写成可回看的思考"
              description="文章区采用编辑式编排。内容没有补齐前，只展示明确的首篇文章槽位。"
              warm
            />
            {blog ? (
              <article className="blog-feature surface" data-reveal>
                <figure className="blog-media media-frame">
                  <picture>
                    <source srcSet={productionAssets.blog.avif} type="image/avif" />
                    <img
                      src={productionAssets.blog.webp}
                      width="1536"
                      height="1024"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </figure>
                <div className="blog-copy">
                  <p className="eyebrow">ISSUE 001 / PLACEHOLDER</p>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                  <PlaceholderLink
                    href={blog.href}
                    label={`阅读文章：${blog.title}`}
                    className="editorial-link"
                  >
                    阅读文章
                  </PlaceholderLink>
                </div>
              </article>
            ) : (
              <p className="empty-state">文章将在真实内容准备好后出现。</p>
            )}
          </div>
        </section>

        <section
          id="videos"
          className="content-section video-section"
          aria-labelledby="videos-title"
        >
          <div className="section-shell">
            <SectionIntro
              id="videos-title"
              index="07"
              eyebrow="MOVING IMAGE / 视频预览"
              title="让过程被看见，而不是伪造一个播放入口"
              description="当前没有真实视频，因此这里是一张静态舞台封面，不显示播放按钮，也不会自动加载媒体。"
            />
            <div className="video-stage surface" data-reveal>
              <figure className="video-poster media-frame">
                <picture>
                  <source srcSet={productionAssets.video.avif} type="image/avif" />
                  <img
                    src={productionAssets.video.webp}
                    width="1536"
                    height="1024"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <div className="media-shade" aria-hidden="true" />
              </figure>
              <div className="video-empty-copy">
                <span className="empty-symbol" aria-hidden="true">
                  00
                </span>
                <div>
                  <p className="eyebrow">NO VIDEO YET</p>
                  <h3>{video?.title ?? "视频内容待补充"}</h3>
                  <p>{video?.summary ?? "真实视频准备好后，这里才会出现可操作的播放控件。"}</p>
                  <span className="placeholder-state">当前为静态封面</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="content-section gallery-section"
          aria-labelledby="gallery-title"
        >
          <div className="section-shell">
            <SectionIntro
              id="gallery-title"
              index="08"
              eyebrow="OBSERVATIONS / 照片墙"
              title="收藏生活里的纹理，也收藏创造发生的幕后"
              description="照片墙现在只承担构图预览；它不假装成真实旅行、人物或创作经历。"
            />
            <figure className="gallery-composition" data-reveal>
              <picture className="gallery-main">
                <source srcSet={productionAssets.gallery.avif} type="image/avif" />
                <img
                  src={productionAssets.gallery.webp}
                  width="1536"
                  height="1024"
                  alt="等待真实照片替换的抽象紫橙画框"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="gallery-card gallery-card-a" aria-hidden="true" />
              <div className="gallery-card gallery-card-b" aria-hidden="true" />
              <figcaption>
                <span>GALLERY PLACEHOLDER</span>
                <strong>{gallery?.title ?? "照片组待补充"}</strong>
                <p>{gallery?.summary ?? "真实照片会在这里组成一组有语境的观察记录。"}</p>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          id="contact"
          className="content-section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="contact-glow" aria-hidden="true" />
          <div className="section-shell">
            <div className="contact-panel" data-reveal>
              <div className="contact-copy">
                <p className="eyebrow">{content.contact.eyebrow}</p>
                <h2 id="contact-title">{content.contact.title}</h2>
                <p>{content.contact.intro}</p>
                <PlaceholderLink
                  href={content.contact.resume.href}
                  label={content.contact.resume.label}
                  className="button button-warm contact-resume"
                >
                  {content.contact.resume.label}
                </PlaceholderLink>
              </div>

              <dl className="contact-list">
                {[content.contact.email, content.contact.phone].map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>
                      <PlaceholderLink href={item.href} label={item.label}>
                        {item.value ?? item.label}
                      </PlaceholderLink>
                    </dd>
                  </div>
                ))}
                <div>
                  <dt>外部平台</dt>
                  <dd className="social-list">
                    {content.contact.socials.map((social) => (
                      <PlaceholderLink
                        href={social.href}
                        label={social.label}
                        key={social.href}
                      >
                        {social.label}
                      </PlaceholderLink>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>

      <footer id="memory" className="memory-footer">
        <div className="section-shell memory-grid">
          <p className="eyebrow">{content.memory.eyebrow}</p>
          <p className="memory-principle">{content.memory.principle}</p>
          <a className="back-to-top" href={content.memory.backToTop.href}>
            {content.memory.backToTop.label}
            <span aria-hidden="true">↑</span>
          </a>
          <div className="memory-meta">
            <span>HOME / HERO STAGE</span>
            <span>内容真实 · 动效克制 · 持续生长</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
