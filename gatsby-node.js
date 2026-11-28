/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const fs = require("fs")
const path = require("path")
const sharp = require("sharp")
const slideDir = require("./scripts/slide-dir")
const pdfPages = require("./scripts/pdf-pages-lookup")

// Record each teaser's pixel size (so pages can reserve its box and avoid a
// layout shift) and the 560px card variant from scripts/teaser-variants.js.
exports.onCreateNode = async ({ node, actions, reporter }) => {
  if (node.internal.type !== "MarkdownRemark") return
  // Page images of a slides PDF, from scripts/pdf-pages.js.
  const slides = node.frontmatter && node.frontmatter.slides
  if (slides && slides.toLowerCase().endsWith(".pdf")) {
    actions.createNodeField({
      node,
      name: "slidePages",
      value: pdfPages(slides, slideDir(slides), reporter),
    })
  }
  const teaser = node.frontmatter && node.frontmatter.teaser
  if (!teaser) return
  const file = path.join(__dirname, "static", teaser)
  if (!fs.existsSync(file)) return
  const { width, height } = await sharp(file).metadata()
  const variant = w => {
    const p = teaser.replace(/\.webp$/, `-${w}.webp`)
    return fs.existsSync(path.join(__dirname, "static", p)) ? p : null
  }
  actions.createNodeField({
    node,
    name: "teaser",
    value: {
      width,
      height,
      tiny: variant(400),
      small: variant(560),
      medium: variant(820),
    },
  })
}

// Page images of the CV for the home page preview (scripts/pdf-pages.js).
exports.sourceNodes = ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const pages = pdfPages("/cv/JacobDineen_CV.pdf", "/cv/pages", reporter)
  const data = { pages }
  actions.createNode({
    ...data,
    id: createNodeId("cv-preview"),
    internal: { type: "CvPreview", contentDigest: createContentDigest(data) },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
    type CvPreview implements Node {
      pages: [String]
    }
    type MarkdownRemarkFields {
      slidePages: [String]
    }
    type MarkdownRemarkFrontmatter {
      description: String
      draft: Boolean
    }
  `)
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const publicationTemplate = path.resolve(`src/templates/publication.js`)

  const result = await graphql(`
    {
      publicationsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/publications/" } }
        sort: { frontmatter: { date: DESC } }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create publication detail pages
  const publications = result.data.publicationsRemark.edges

  publications.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: publicationTemplate,
      context: {},
    })
  })
}

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    })
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@config": path.resolve(__dirname, "src/config"),
        "@fonts": path.resolve(__dirname, "src/fonts"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@images": path.resolve(__dirname, "src/images"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utils": path.resolve(__dirname, "src/utils"),
      },
    },
  })
}
