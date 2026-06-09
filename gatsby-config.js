module.exports = {
  // Gatsby 5 changed the default to "always", which broke the per-paper
  // template query (slugs in markdown have no trailing slash).
  trailingSlash: "never",
  siteMetadata: {
    title: "Jacob Dineen",
    description: "Jacob Dineen: CS PhD Student / ML Engineer",
    siteUrl: "https://www.jacobdineen.com", // No trailing slash allowed!
    image: "/og.png", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap`,
        // The /pensieve section is currently empty (no posts), so its index,
        // tag-listing, and per-tag pages have no real content for Google to
        // index. Excluding them keeps the sitemap focused on real pages.
        excludes: [`/pensieve`, `/pensieve/**`, `/404`, `/404.html`],
      },
    },
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Jacob Dineen",
        short_name: "Jacob Dineen",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        display: "minimal-ui",
        icon: "src/images/logo.png",
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`,
      },
    },

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // Slug + clickable anchor on every heading (must come early so other
            // plugins see the IDs already attached).
            resolve: "gatsby-remark-autolink-headers",
            options: {
              icon: '<svg aria-hidden="true" focusable="false" height="14" version="1.1" viewBox="0 0 16 16" width="14"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: "anchor-link",
              maintainCase: false,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: ["h2", "h3", "h4"],
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-images
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
            },
          },
          // gatsby-remark-prismjs and gatsby-remark-code-titles previously
          // ran here to render fenced code blocks. The /pensieve blog has
          // no posts and the publication markdown contains no fenced
          // blocks (bibtex uses YAML block scalars, not ``` fences). The
          // plugins were doing nothing at build time and pulling prismjs
          // into the runtime. Restore here if posts return.
        ],
      },
    },
  ],
}
