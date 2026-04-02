import { css } from "styled-components"

const variables = css`
  :root {
    --dark-navy: #000000;
    --navy: #000000;
    --light-navy: #161616;
    --lightest-navy: #2d2d2d;
    --navy-shadow: rgba(0, 0, 0, 0.25);

    --dark-slate: #86868b;
    --slate: #a1a1a6;
    --light-slate: #d1d1d6;
    --lightest-slate: #f5f5f7;
    --white: #ffffff;

    --green: #0071e3;
    --green-tint: rgba(0, 113, 227, 0.1);

    --pink: #ff375f;
    --blue: #0077ed;

    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    --font-mono: "SF Mono", "JetBrains Mono", "Fira Code", "Consolas", monospace;

    --fz-xxs: 11px;
    --fz-xs: 12px;
    --fz-sm: 13px;
    --fz-md: 15px;
    --fz-lg: 17px;
    --fz-xl: 19px;
    --fz-xxl: 21px;
    --fz-heading: 28px;

    --border-radius: 10px;
    --border-radius-sm: 6px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.4, 0, 0.2, 1);
    --transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, opacity 0.15s ease, transform 0.15s ease;

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s,
      transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`

export default variables
