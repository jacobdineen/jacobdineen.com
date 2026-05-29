import React, { useEffect, useMemo, useState } from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Layout } from "@components"
import TransitionLink from "@utils/TransitionLink"

const StyledMain = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 80px 24px 60px;

  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`

const Header = styled.header`
  margin-bottom: 32px;

  .code {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
    margin-bottom: 8px;
  }

  h1 {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 6vw, 3rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
    line-height: 1.15;
    font-variation-settings: "opsz" 96;
  }

  .attempted {
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    font-size: 0.92rem;
    line-height: 1.5;

    code {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      padding: 2px 6px;
      border-radius: 4px;
      background: ${({ theme }) =>
        theme.mode === "light" ? "#f5f5f7" : "#1d1d1f"};
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    }
  }
`

const Search = styled.input`
  width: 100%;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#f5f5f7" : "#161616"};
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.95rem;
  font-family: var(--font-sans);
  outline: none;
  transition: border-color 0.15s ease;
  margin-bottom: 24px;

  &:focus {
    border-color: #0071e3;
  }

  &::placeholder {
    color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
  }
`

const SectionLabel = styled.h2`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
  margin: 24px 0 10px;
  font-weight: 500;
`

const ResultList = styled.ul`
  list-style: none;
  margin: 0 0 8px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;

  li {
    a {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 6px;
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      text-decoration: none;
      font-size: 0.9rem;

      &:hover {
        background: ${({ theme }) =>
          theme.mode === "light" ? "#f5f5f7" : "#1d1d1f"};
        color: #0071e3;
      }

      &:after {
        display: none;
      }
    }

    .meta {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      flex-shrink: 0;
    }
  }
`

const QuickLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;

  a {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
    font-family: var(--font-mono);
    font-size: 0.74rem;
    text-decoration: none;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover {
      color: #0071e3;
      border-color: #0071e3;
    }

    &:after {
      display: none;
    }
  }
`

const score = (haystack, needle) => {
  if (!needle) return 0
  const h = haystack.toLowerCase()
  const n = needle.toLowerCase()
  if (h.includes(n)) return 100 - h.indexOf(n)
  return -1
}

const NotFoundPage = ({ location, data }) => {
  const attempted =
    location && location.pathname && location.pathname !== "/404.html"
      ? location.pathname
      : null
  const initialQuery = useMemo(() => {
    if (!attempted) return ""
    return attempted.replace(/[/_-]+/g, " ").trim()
  }, [attempted])
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const items = useMemo(() => {
    const pubs = data.publications.edges
      .filter(({ node }) => node.frontmatter.slug)
      .map(({ node }) => {
        const fm = node.frontmatter
        const year = fm.date ? new Date(fm.date).getFullYear() : ""
        return {
          type: "publication",
          title: fm.title,
          path: fm.slug,
          meta: [fm.venue, year].filter(Boolean).join(" · "),
          searchText: `${fm.title || ""} ${(fm.tags || []).join(" ")}`,
        }
      })
    const posts = data.posts.edges
      .filter(({ node }) => node.frontmatter.slug)
      .map(({ node }) => {
        const fm = node.frontmatter
        return {
          type: "post",
          title: fm.title,
          path: fm.slug,
          meta: fm.description || "",
          searchText: `${fm.title || ""} ${fm.description || ""}`,
        }
      })
    return [...pubs, ...posts]
  }, [data])

  const matches = useMemo(() => {
    const q = query.trim()
    if (!q) return []
    return items
      .map(it => ({ it, s: score(it.searchText, q) }))
      .filter(({ s }) => s > -1)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6)
      .map(({ it }) => it)
  }, [items, query])

  const recent = useMemo(() => items.slice(0, 4), [items])

  return (
    <Layout location={location}>
      <Helmet title="Page Not Found" />

      <StyledMain>
        <Header>
          <div className="code">404</div>
          <h1>Couldn&apos;t find that page.</h1>
          {attempted && (
            <p className="attempted">
              You tried <code>{attempted}</code>. Search below or pick something
              from the suggestions.
            </p>
          )}
        </Header>

        <Search
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search publications and posts…"
          aria-label="Search the site"
          autoFocus
        />

        {matches.length > 0 ? (
          <>
            <SectionLabel>Did you mean</SectionLabel>
            <ResultList>
              {matches.map((it, i) => (
                <li key={i}>
                  <TransitionLink to={it.path}>
                    <span>{it.title}</span>
                    <span className="meta">{it.meta}</span>
                  </TransitionLink>
                </li>
              ))}
            </ResultList>
          </>
        ) : (
          <>
            <SectionLabel>Recent publications</SectionLabel>
            <ResultList>
              {recent.map((it, i) => (
                <li key={i}>
                  <TransitionLink to={it.path}>
                    <span>{it.title}</span>
                    <span className="meta">{it.meta}</span>
                  </TransitionLink>
                </li>
              ))}
            </ResultList>
          </>
        )}

        <QuickLinks aria-label="Site sections">
          <Link to="/">Home</Link>
          <Link to="/publications">All publications</Link>
          <Link to="/collaborators">Collaborators</Link>
          <Link to="/pensieve">Pensieve</Link>
        </QuickLinks>
      </StyledMain>
    </Layout>
  )
}

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    publications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/publications/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            venue
            date
            tags
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            description
          }
        }
      }
    }
  }
`
