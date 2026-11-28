/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&family=JetBrains+Mono:wght@400;500&display=swap"

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })

  // Google Fonts was a render-blocking stylesheet (~750 ms on PageSpeed
  // mobile). Load it as media="print" so it doesn't block first paint, then
  // switch it to "all" once it has loaded. display=swap in the URL keeps
  // text visible in the fallback font meanwhile. React drops string onload
  // handlers in SSR, so a tiny inline script does the switch.
  setHeadComponents([
    <link key="gf-pc1" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      key="gf-pc2"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="gf-css"
      id="gf-css"
      rel="stylesheet"
      href={FONTS_HREF}
      media="print"
    />,
    <script
      key="gf-swap"
      dangerouslySetInnerHTML={{
        __html:
          "(function(){var l=document.getElementById('gf-css');if(!l)return;var on=function(){l.media='all'};if(l.sheet){on()}else{l.addEventListener('load',on)}})()",
      }}
    />,
    <noscript key="gf-noscript">
      <link rel="stylesheet" href={FONTS_HREF} />
    </noscript>,
  ])
}
