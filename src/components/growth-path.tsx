export function GrowthPath() {
  return (
    <svg
      className="growth-path"
      viewBox="0 0 1200 1800"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path
        className="growth-path-shadow"
        d="M100 0C96 210 336 188 324 402C310 650 1020 562 1002 834C990 1018 616 930 608 1150C598 1404 1080 1398 1100 1800"
      />
      <path
        className="growth-path-line"
        d="M100 0C96 210 336 188 324 402C310 650 1020 562 1002 834C990 1018 616 930 608 1150C598 1404 1080 1398 1100 1800"
      />
      <g className="growth-nodes">
        <circle cx="100" cy="36" r="7" />
        <circle cx="324" cy="402" r="7" />
        <circle cx="1002" cy="834" r="8" />
        <circle cx="608" cy="1150" r="7" />
        <circle cx="1100" cy="1752" r="9" />
      </g>
    </svg>
  );
}
