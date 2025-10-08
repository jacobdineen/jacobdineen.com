import React from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { Layout } from "@components"
import { Icon } from "@components/icons"

const StyledPublicationContainer = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 50px;

  @media (max-width: 768px) {
    padding: 80px 25px;
  }
`

const StyledPublicationHeader = styled.header`
  margin-bottom: 40px;

  h1 {
    font-size: clamp(24px, 5vw, 40px);
    margin-bottom: 20px;
    color: var(--lightest-slate);
  }

  .authors {
    font-size: var(--fz-lg);
    color: var(--slate);
    margin-bottom: 10px;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 20px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--light-slate);
    flex-wrap: wrap;

    .venue {
      color: var(--green);
    }

    .date {
      color: var(--slate);
    }
  }
`

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 30px 0;
  flex-wrap: wrap;

  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      background-color: var(--green-tint);
      transform: translateY(-2px);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }
`

const StyledAbstract = styled.div`
  margin: 40px 0;

  h2 {
    font-size: var(--fz-xxl);
    margin-bottom: 20px;
    color: var(--lightest-slate);
  }

  p {
    font-size: var(--fz-lg);
    line-height: 1.6;
    color: var(--slate);
    text-align: justify;
  }
`

const StyledBibtex = styled.div`
  margin: 40px 0;

  h2 {
    font-size: var(--fz-xxl);
    margin-bottom: 20px;
    color: var(--lightest-slate);
  }

  pre {
    background-color: var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 20px;
    overflow-x: auto;

    code {
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      color: var(--light-slate);
      line-height: 1.5;
    }
  }

  button {
    margin-top: 15px;
    padding: 10px 18px;
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    &:hover {
      background-color: var(--green-tint);
    }
  }
`

const PublicationTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark
  const {
    title,
    authors,
    date,
    venue,
    abstract,
    bibtex,
    arxiv,
    googlescholar,
    semanticscholar,
    paperurl,
    code,
    slug,
  } = frontmatter

  // Parse authors for meta tags
  const authorList = authors ? authors.split(",").map(a => a.trim()) : []

  // Extract arXiv ID if available
  const arxivId = arxiv ? arxiv.match(/(\d{4}\.\d{4,5})/)?.[1] : null

  // Format date for citation
  const publicationDate = new Date(date)
  const citationDate = `${publicationDate.getFullYear()}/${String(
    publicationDate.getMonth() + 1
  ).padStart(2, "0")}/${String(publicationDate.getDate()).padStart(2, "0")}`

  const copyBibtex = () => {
    navigator.clipboard.writeText(bibtex)
  }

  return (
    <Layout location={location}>
      <Helmet title={title}>
        {/* Google Scholar Meta Tags */}
        <meta name="citation_title" content={title} />
        {authorList.map((author, i) => (
          <meta key={i} name="citation_author" content={author} />
        ))}
        <meta name="citation_publication_date" content={citationDate} />
        {venue && <meta name="citation_conference_title" content={venue} />}
        {venue && <meta name="citation_journal_title" content={venue} />}
        {arxivId && <meta name="citation_arxiv_id" content={arxivId} />}
        {paperurl && <meta name="citation_pdf_url" content={paperurl} />}
        {abstract && (
          <meta name="description" content={abstract.substring(0, 160)} />
        )}

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        {abstract && (
          <meta
            property="og:description"
            content={abstract.substring(0, 200)}
          />
        )}

        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: title,
            author: authorList.map(name => ({
              "@type": "Person",
              name: name,
            })),
            datePublished: publicationDate.toISOString().split("T")[0],
            publisher: venue || "arXiv",
            abstract: abstract,
            url: `https://jacobdineen.github.io${slug}`,
            ...(arxiv && { sameAs: arxiv }),
            ...(paperurl && { url: paperurl }),
          })}
        </script>
      </Helmet>

      <StyledPublicationContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/#experience">All publications</Link>
        </span>

        <StyledPublicationHeader>
          <h1>{title}</h1>
          <p className="authors">{authors}</p>
          {venue && (
            <div className="meta">
              <span className="venue">{venue}</span>
            </div>
          )}
        </StyledPublicationHeader>

        <StyledLinks>
          {arxiv && (
            <a href={arxiv} target="_blank" rel="noopener noreferrer">
              <Icon name="Arxiv" />
              arXiv
            </a>
          )}
          {googlescholar && (
            <a href={googlescholar} target="_blank" rel="noopener noreferrer">
              <Icon name="GScholar" />
              Google Scholar
            </a>
          )}
          {semanticscholar && (
            <a href={semanticscholar} target="_blank" rel="noopener noreferrer">
              <Icon name="SemanticScholar" />
              Semantic Scholar
            </a>
          )}
          {paperurl && (
            <a href={paperurl} target="_blank" rel="noopener noreferrer">
              <Icon name="External" />
              PDF
            </a>
          )}
          {code && (
            <a href={code} target="_blank" rel="noopener noreferrer">
              <Icon name="GitHub" />
              Code
            </a>
          )}
        </StyledLinks>

        {abstract && (
          <StyledAbstract>
            <h2>Abstract</h2>
            <p>{abstract}</p>
          </StyledAbstract>
        )}

        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}

        {bibtex && (
          <StyledBibtex>
            <h2>Citation</h2>
            <pre>
              <code>{bibtex}</code>
            </pre>
            <button onClick={copyBibtex}>Copy BibTeX</button>
          </StyledBibtex>
        )}
      </StyledPublicationContainer>
    </Layout>
  )
}

export default PublicationTemplate

PublicationTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        slug
        authors
        date
        venue
        abstract
        bibtex
        arxiv
        googlescholar
        semanticscholar
        paperurl
        code
      }
    }
  }
`
