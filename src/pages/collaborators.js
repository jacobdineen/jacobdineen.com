import React, { useMemo, useState } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { Layout } from "@components"
import collaboratorLinks from "@utils/collaboratorLinks"
import { canonicalKey, canonicalDisplay } from "@utils/normalizeAuthor"
import TransitionLink from "@utils/TransitionLink"

const ME_KEY = "jacob dineen"

const StyledMain = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px;

  @media (max-width: 768px) {
    padding: 28px 16px;
  }

  header {
    margin-bottom: 28px;

    h1 {
      font-family: var(--font-serif);
      font-size: clamp(1.85rem, 4vw, 2.5rem);
      font-weight: 500;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      font-variation-settings: "opsz" 96;
    }

    .subtitle {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
      font-size: 0.88rem;
      max-width: 640px;
      line-height: 1.5;
    }
  }
`

const TierLabel = styled.h2`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
  margin: 32px 0 12px;
  font-weight: 500;

  &:first-of-type {
    margin-top: 0;
  }

  .count {
    color: ${({ theme }) => (theme.mode === "light" ? "#a1a1a6" : "#6e6e73")};
    margin-left: 6px;
    text-transform: none;
    letter-spacing: 0;
  }
`

const Grid = styled.ul`
  list-style: none;
  margin: 0 0 8px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
`

const Card = styled.li`
  padding: 14px 16px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
  background: ${({ theme }) =>
    theme.mode === "light" ? "#ffffff" : "#161616"};
  transition: border-color 0.1s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#a1a1a6" : "#424245"};
  }

  .name-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 6px;
  }

  .name {
    font-family: var(--font-serif);
    font-size: 0.98rem;
    font-weight: 500;
    line-height: 1.25;

    a {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      text-decoration: none;
      &:hover {
        color: #0071e3;
      }
      &:after {
        display: none;
      }
    }
  }

  .count {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    flex-shrink: 0;
  }

  .papers {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-top: 4px;
  }

  .paper {
    font-size: 0.78rem;
    line-height: 1.35;
    color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};

    a {
      color: inherit;
      text-decoration: none;
      &:hover {
        color: #0071e3;
      }
      &:after {
        display: none;
      }
    }

    .year {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      margin-right: 6px;
    }
  }

  .more-toggle {
    margin-top: 4px;
    align-self: flex-start;
    background: transparent;
    border: none;
    padding: 2px 0;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: #0071e3;
    cursor: pointer;
    transition: color 0.12s ease;

    &:hover {
      color: ${({ theme }) => (theme.mode === "light" ? "#005bb5" : "#3a9bff")};
    }

    &:focus-visible {
      outline: 2px solid #0071e3;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }
`

const FilterBar = styled.div`
  display: inline-flex;
  gap: 0;
  margin: 0 0 24px;
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
`

const FilterButton = styled.button`
  background: transparent;
  border: none;
  padding: 6px 14px;
  font-family: var(--font-mono);
  font-size: 0.74rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ $active, theme }) =>
    $active
      ? theme.mode === "light"
        ? "#1d1d1f"
        : "#f5f5f7"
      : theme.mode === "light"
      ? "#86868b"
      : "#6e6e73"};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ $active, theme }) =>
      $active
        ? theme.mode === "light"
          ? "#1d1d1f"
          : "#f5f5f7"
        : "transparent"};
  margin-bottom: -1px;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }
`

const tierFor = count => {
  if (count >= 4) return "frequent"
  if (count >= 2) return "recurring"
  return "single"
}

const TIER_ORDER = ["frequent", "recurring", "single"]
const TIER_LABEL = {
  frequent: "Frequent (4+ papers)",
  recurring: "Recurring (2–3 papers)",
  single: "Single paper",
}

const PAPER_PREVIEW_LIMIT = 4

const CollaboratorsPage = ({ location, data }) => {
  const publications = data.allMarkdownRemark.edges
  const [filter, setFilter] = useState("all")
  const [expanded, setExpanded] = useState({})

  const toggleExpanded = id =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const collaborators = useMemo(() => {
    const map = new Map() // canonicalKey -> { id, name, papers: [] }
    for (const { node } of publications) {
      const fm = node.frontmatter
      const authorList = (fm.authors || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
      if (!authorList.some(n => canonicalKey(n) === ME_KEY)) continue
      const paper = {
        slug: fm.slug,
        title: fm.title,
        year: fm.date ? new Date(fm.date).getFullYear() : null,
      }
      for (const name of authorList) {
        const key = canonicalKey(name)
        if (key === ME_KEY) continue
        if (!map.has(key)) {
          map.set(key, {
            id: key,
            name: canonicalDisplay(name, name),
            papers: [],
          })
        }
        map.get(key).papers.push(paper)
      }
    }
    return Array.from(map.values())
      .map(c => ({
        ...c,
        url: collaboratorLinks[c.id] || null,
      }))
      .sort((a, b) => {
        if (b.papers.length !== a.papers.length) {
          return b.papers.length - a.papers.length
        }
        return a.name.localeCompare(b.name)
      })
  }, [publications])

  const tiers = useMemo(() => {
    const groups = { frequent: [], recurring: [], single: [] }
    for (const c of collaborators) {
      groups[tierFor(c.papers.length)].push(c)
    }
    return groups
  }, [collaborators])

  const visibleTiers = useMemo(() => {
    if (filter === "all") return TIER_ORDER
    return [filter]
  }, [filter])

  const totals = {
    all: collaborators.length,
    frequent: tiers.frequent.length,
    recurring: tiers.recurring.length,
    single: tiers.single.length,
  }

  return (
    <Layout location={location}>
      <Helmet>
        <title>Collaborators — Jacob Dineen</title>
        <meta
          name="description"
          content={`${collaborators.length} co-authors across Jacob Dineen's publications, with shared paper counts and links to their pages.`}
        />
      </Helmet>

      <StyledMain>
        <header>
          <h1>Collaborators</h1>
          <p className="subtitle">
            Everyone I&apos;ve published with. {collaborators.length} co-authors
            across{" "}
            {
              publications.filter(({ node }) =>
                (node.frontmatter.authors || "").toLowerCase().includes(ME_KEY)
              ).length
            }{" "}
            papers. Sorted by frequency. Names link to personal sites where
            available.
          </p>
        </header>

        <FilterBar>
          {[
            { id: "all", label: `All (${totals.all})` },
            { id: "frequent", label: `Frequent (${totals.frequent})` },
            { id: "recurring", label: `Recurring (${totals.recurring})` },
            { id: "single", label: `Single (${totals.single})` },
          ].map(({ id, label }) => (
            <FilterButton
              key={id}
              type="button"
              $active={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </FilterButton>
          ))}
        </FilterBar>

        {visibleTiers.map(tier => {
          const list = tiers[tier]
          if (!list || list.length === 0) return null
          return (
            <section key={tier}>
              <TierLabel>
                {TIER_LABEL[tier]}{" "}
                <span className="count">· {list.length}</span>
              </TierLabel>
              <Grid>
                {list.map(c => {
                  const sorted = c.papers
                    .slice()
                    .sort((a, b) => (b.year || 0) - (a.year || 0))
                  const isExpanded = !!expanded[c.id]
                  const visible =
                    isExpanded || sorted.length <= PAPER_PREVIEW_LIMIT
                      ? sorted
                      : sorted.slice(0, PAPER_PREVIEW_LIMIT)
                  const hiddenCount = sorted.length - visible.length
                  return (
                    <Card key={c.id}>
                      <div className="name-row">
                        <span className="name">
                          {c.url ? (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {c.name}
                            </a>
                          ) : (
                            c.name
                          )}
                        </span>
                        <span className="count">
                          {c.papers.length} paper
                          {c.papers.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="papers">
                        {visible.map((p, i) => (
                          <span key={i} className="paper">
                            <span className="year">{p.year || "—"}</span>
                            {p.slug ? (
                              <TransitionLink to={p.slug}>
                                {p.title}
                              </TransitionLink>
                            ) : (
                              p.title
                            )}
                          </span>
                        ))}
                      </div>
                      {sorted.length > PAPER_PREVIEW_LIMIT && (
                        <button
                          type="button"
                          className="more-toggle"
                          onClick={() => toggleExpanded(c.id)}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded
                            ? "Show fewer"
                            : `Show ${hiddenCount} more`}
                        </button>
                      )}
                    </Card>
                  )
                })}
              </Grid>
            </section>
          )
        })}
      </StyledMain>
    </Layout>
  )
}

CollaboratorsPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

export default CollaboratorsPage

export const pageQuery = graphql`
  query {
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
          }
        }
      }
    }
  }
`
