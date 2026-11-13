import { css } from "styled-components"

// Site fonts come from Google Fonts (Inter, Fraunces, JetBrains Mono) via
// <link> in components/head.js with display=swap. Until they arrive the page
// renders in a local fallback. These fallback faces are scaled to the web
// fonts' widths so lines don't rewrap (and shift the page) on swap.
// Ratios measured against Times New Roman / Arial metrics (Liberation fonts
// are metric-compatible on Linux).
const Fonts = css`
  @font-face {
    font-family: "Fraunces Fallback";
    src: local("Times New Roman"), local("TimesNewRomanPSMT"),
      local("Liberation Serif"), local("Times");
    font-weight: 100 549;
    size-adjust: 117.8%;
  }

  @font-face {
    font-family: "Fraunces Fallback";
    src: local("Times New Roman Bold"), local("TimesNewRomanPS-BoldMT"),
      local("Liberation Serif Bold"), local("Times Bold");
    font-weight: 550 900;
    size-adjust: 111.8%;
  }

  @font-face {
    font-family: "Inter Fallback";
    src: local("Arial"), local("ArialMT"), local("Liberation Sans"),
      local("Helvetica");
    size-adjust: 106.6%;
    ascent-override: 90.5%;
    descent-override: 22.5%;
    line-gap-override: 0%;
  }
`

export default Fonts
