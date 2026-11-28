import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

// Site-wide <head> tags for Gatsby's Head API. Each page's `export const
// Head` renders <Seo> with its own title, description and image; anything
// page-specific (citation tags, JSON-LD) goes in as children. The Head API
// doesn't merge tags the way react-helmet did, so every overridable value
// lives here exactly once.
// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/

const Seo = ({
  title,
  description,
  image,
  pathname,
  ogType,
  noindex,
  children,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
          }
        }
      }
    `
  )

  const { defaultTitle, defaultDescription, siteUrl, defaultImage } =
    site.siteMetadata

  const shareTitle = title || defaultTitle
  const desc = description || defaultDescription
  const img = image
    ? /^https?:\/\//.test(image)
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${defaultImage}`
  const url = `${siteUrl}${pathname || "/"}`

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {/* Warm DNS for the external hosts every paper page links out to. */}
      <link rel="dns-prefetch" href="https://arxiv.org" />
      <link rel="dns-prefetch" href="https://www.alphaxiv.org" />
      <link rel="dns-prefetch" href="https://scholar.google.com" />
      <link rel="dns-prefetch" href="https://www.semanticscholar.org" />
      <link rel="dns-prefetch" href="https://github.com" />

      <meta name="description" content={desc} />
      <meta name="image" content={img} />

      <meta property="og:title" content={shareTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={shareTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      <meta
        name="google-site-verification"
        content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Jacob Dineen",
          alternateName: "Jake Dineen",
          jobTitle: "CS PhD Student / ML Engineer",
          url: `${siteUrl}/`,
          affiliation: {
            "@type": "CollegeOrUniversity",
            name: "Arizona State University",
            url: "https://www.asu.edu",
          },
          knowsAbout: [
            "Large language models",
            "Reinforcement learning",
            "LLM post-training",
            "AI alignment",
            "AI safety",
            "LLM evaluation",
          ],
          sameAs: [
            "https://github.com/jacobdineen",
            "https://www.linkedin.com/in/jacobdineen/",
            "https://scholar.google.com/citations?user=2sYaEtQAAAAJ",
            "https://orcid.org/0000-0002-0013-0740",
          ],
          alumniOf: [
            {
              "@type": "CollegeOrUniversity",
              name: "Arizona State University",
            },
            {
              "@type": "CollegeOrUniversity",
              name: "University of Virginia",
            },
          ],
          // Site-wide, not the current page's: on a paper page the page
          // description is that paper's summary, which would mis-describe
          // the person.
          description: defaultDescription,
          image: `${siteUrl}${defaultImage}`,
        })}
      </script>

      <meta name="author" content="Jacob Dineen" />
      <meta
        name="robots"
        content={noindex ? "noindex, follow" : "index, follow"}
      />
      {/* The light theme's background; Layout swaps it when the theme
          changes so the phone's browser bar matches the page. */}
      <meta name="theme-color" content="#ffffff" />
      {!noindex && <link rel="canonical" href={url} />}
      {children}
    </>
  )
}

export default Seo

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  ogType: PropTypes.string,
  noindex: PropTypes.bool,
  children: PropTypes.node,
}

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: "/",
  ogType: "website",
  noindex: false,
  children: null,
}
