/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require("react")
const FACES = require("./src/utils/fontFaces")

// Inter, Fraunces and JetBrains Mono are self-hosted from static/fonts (the
// Latin and Latin Extended subsets Google Fonts serves, SIL OFL). Loading
// them from fonts.googleapis.com cost a stylesheet round trip to another
// origin before any font could start downloading. The @font-face rules are
// inlined so the browser knows the files at first parse. unicode-range means
// a page only fetches the subsets its text uses.

// Fonts used above the fold on every page.
const PRELOAD = ["/fonts/inter-latin.woff2", "/fonts/fraunces-latin.woff2"]

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })

  setHeadComponents([
    ...PRELOAD.map(href => (
      <link
        key={href}
        rel="preload"
        href={href}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    )),
    <style key="font-faces" dangerouslySetInnerHTML={{ __html: FACES }} />,
  ])
}
