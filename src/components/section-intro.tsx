type SectionIntroProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  warm?: boolean;
};

export function SectionIntro({
  id,
  index,
  eyebrow,
  title,
  description,
  warm = false,
}: SectionIntroProps) {
  return (
    <header className="section-intro" data-warm={warm} data-reveal>
      <div className="section-kicker">
        <span>{index}</span>
        <p>{eyebrow}</p>
      </div>
      <div className="section-heading">
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}
