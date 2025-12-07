import { css } from "styled-components"

const variables = css`
  :root {
    /* Dark theme base colors */
    --dark-navy: #000000;
    --navy: #000000;
    --light-navy: #161616;
    --lightest-navy: #2d2d2d;
    --navy-shadow: rgba(0, 0, 0, 0.25);

    /* Text colors - work on dark backgrounds */
    --dark-slate: #86868b;
    --slate: #a1a1a6;
    --light-slate: #d1d1d6;
    --lightest-slate: #f5f5f7;
    --white: #ffffff;

    /* Apple blue accent */
    --green: #0071e3;
    --green-tint: rgba(0, 113, 227, 0.1);

    /* Secondary */
    --pink: #ff375f;
    --blue: #0077ed;

    /* Apple's SF Pro system font stack */
    --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    --font-mono: "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Fira Mono",
      monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    /* Apple-style rounded corners */
    --border-radius: 12px;
    --border-radius-sm: 8px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    /* Smooth Apple-like easing */
    --easing: cubic-bezier(0.4, 0, 0.2, 1);
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

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
