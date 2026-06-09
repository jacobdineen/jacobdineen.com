import { css } from "styled-components"

// Site fonts now come from Google Fonts (Inter, Fraunces, JetBrains Mono)
// loaded via <link> in components/head.js. The previously-bundled Calibre
// and SF Mono webfonts were never referenced by any --font-* CSS variable
// stack, so the @font-face declarations and ~2 MB of woff/woff2 source
// files were dead weight — removed.
const Fonts = css``

export default Fonts
