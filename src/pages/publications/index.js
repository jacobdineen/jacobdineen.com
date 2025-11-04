import React from "react"
import { Link, graphql, withPrefix } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout } from "@components"
import { Icon } from "@components/icons"

const StyledMainContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 50px;

  @media (max-width: 768px) {
    padding: 80px 25px;
  }

  header {
    margin-bottom: 60px;

    h1 {
      font-size: clamp(40px, 8vw, 80px);
      margin-bottom: 20px;
    }

    .subtitle {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-md);
      font-weight: 400;
      line-height: 1.5;
    }
  }
`

const StyledPublicationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const StyledPublication = styled.article`
  position: relative;
  padding: 30px;
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
  }

  h3 {
    font-size: var(--fz-xxl);
    margin-bottom: 15px;

    a {
      position: relative;
      color: var(--lightest-slate);
      text-decoration: none;

      &:hover {
        color: var(--green);
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
      }
    }
  }

  .authors {
    color: var(--slate);
    font-size: var(--fz-lg);
    margin-bottom: 10px;

    .me {
      color: var(--green);
      font-weight: 600;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    flex-wrap: wrap;

    .venue {
      color: var(--green);
    }

    .date {
      color: var(--light-slate);
    }
  }

  .abstract {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;

    a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      text-decoration: none;
      transition: color 0.25s;

      &:hover {
        color: var(--green);
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
`

const PublicationsPage = ({ location, data }) => {
  const publications = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <Helmet title="Publications" />

      <StyledMainContainer>
        <header>
          <h1 className="big-heading">Publications</h1>
          <p className="subtitle">Research papers and academic work</p>
        </header>

        <StyledPublicationsList>
          {publications.length > 0 &&
            publications.map(({ node }, i) => {
              const { frontmatter } = node
              const {
                title,
                slug,
                authors,
                date,
                venue,
                abstract,
                arxiv,
                googlescholar,
                semanticscholar,
                paperurl,
                code,
                slides,
              } = frontmatter

              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })

              const isArxivPdf = paperurl && /arxiv\.org/.test(paperurl)

              const highlightMe = authorsStr => {
                if (!authorsStr) return null
                const parts = authorsStr.split(/(Jacob\s+Dineen)/i)
                return parts.map((part, idx) =>
                  /Jacob\s+Dineen/i.test(part) ? (
                    <span key={idx} className="me">
                      {part}
                    </span>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )
              }

              return (
                <StyledPublication key={i}>
                  <h3>
                    <Link to={slug}>{title}</Link>
                  </h3>
                  <p className="authors">{highlightMe(authors)}</p>
                  <div className="meta">
                    {venue && <span className="venue">{venue}</span>}
                    <span className="date">{formattedDate}</span>
                  </div>
                  {abstract && <p className="abstract">{abstract}</p>}
                  <div className="links">
                    <Link to={slug}>View Details →</Link>
                    {arxiv && (
                      <a href={arxiv} target="_blank" rel="noopener noreferrer">
                        <Icon name="Arxiv" />
                        arXiv
                      </a>
                    )}
                    {googlescholar && (
                      <a
                        href={googlescholar}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="GScholar" />
                        Scholar
                      </a>
                    )}
                    {semanticscholar && (
                      <a
                        href={semanticscholar}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="SemanticScholar" />
                        Semantic
                      </a>
                    )}
                    {paperurl && (!isArxivPdf || !arxiv) && (
                      <a
                        href={paperurl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="External" />
                        PDF
                      </a>
                    )}
                    {slides && (
                      <a
                        href={withPrefix(slides)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="Slides" />
                        Slides
                      </a>
                    )}
                    {code && (
                      <a href={code} target="_blank" rel="noopener noreferrer">
                        <Icon name="GitHub" />
                        Code
                      </a>
                    )}
                  </div>
                </StyledPublication>
              )
            })}
        </StyledPublicationsList>
      </StyledMainContainer>
    </Layout>
  )
}

PublicationsPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default PublicationsPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            authors
            date
            venue
            abstract
            arxiv
            googlescholar
            semanticscholar
            paperurl
            code
            slides
          }
        }
      }
    }
  }
`
