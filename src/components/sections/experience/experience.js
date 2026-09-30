import React, { useState, useEffect, useRef, useMemo } from "react"
import { useStaticQuery, graphql, withPrefix } from "gatsby"
import TransitionLink from "@utils/TransitionLink"
import styled from "styled-components"
import { srConfig } from "@config"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"
import EntryListItem from "./EntryListItem"
import StyledText from "./StyledText"
import StyledJobsSection from "./StyledJobsSection"
import StyledTabList from "./StyledTabList"
import PublicationListItem from "./PublicationListItem"
import {
  IconArxiv,
  IconAlphaxiv,
  IconGitHub,
  IconExternal,
  IconChevronRight,
  IconSlides,
} from "@components/icons"
import collaboratorLinks from "@utils/collaboratorLinks"

const venueTier = venue => {
  const v = (venue || "").toLowerCase()
  if (/preprint|pending|under review|arxiv/.test(v)) return "tier-pre"
  if (/workshop|@|viscon/.test(v)) return "tier-ws"
  if (/findings/.test(v)) return "tier-conf"
  if (
    /\b(emnlp|acl|naacl|colm|neurips|icml|iclr|cvpr|iccv|eccv|aaai|kdd)\b/.test(
      v
    ) &&
    !/aacl/.test(v)
  )
    return "tier-top"
  return "tier-conf"
}

const RESEARCH_THREADS = [
  {
    id: "post-training",
    label: "Post\u2011training & RL",
    blurb: "Reward design, RL fine-tuning, and training-time interventions.",
    tags: ["post-training", "rl"],
  },
  {
    id: "reasoning",
    label: "Reasoning",
    blurb: "Eliciting and supervising multi-step reasoning in LLMs and VLMs.",
    tags: ["reasoning"],
  },
  {
    id: "safety",
    label: "Alignment & safety",
    blurb:
      "Constitutional alignment, covert agent behavior, inference-time control.",
    tags: ["alignment", "safety", "inference-time"],
  },
  {
    id: "evaluation",
    label: "Agents & evaluation",
    blurb: "Benchmarks and protocols for agents, forecasters, and judges.",
    tags: ["agents", "evaluation"],
  },
]

const abstractSnippet = text => {
  if (!text) return ""
  const clean = text.replace(/\s+/g, " ").trim()
  const sentences = clean.match(/[^.!?]+[.!?]+(\s|$)/g) || [clean]
  let out = sentences.slice(0, 2).join("").trim()
  if (out.length > 300) out = `${out.slice(0, 297).replace(/\s+\S*$/, "")}…`
  return out
}

const ContentTypeButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 28px;
  padding: 8px 0 0;
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
`

const ContentTypeButton = styled.button`
  position: relative;
  background: transparent;
  color: ${({ isActive, theme }) =>
    isActive
      ? theme.mode === "light"
        ? "#1d1d1f"
        : "#f5f5f7"
      : theme.mode === "light"
      ? "#6e6e73"
      : "#6e6e73"};
  border: none;
  border-radius: 0;
  padding: 6px 0;
  margin: 0 14px;
  font-size: 0.78rem;
  font-family: var(--font-mono);
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: color 0.15s ease;
  cursor: ${props => (props.isActive ? "default" : "pointer")};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${({ isActive, theme }) =>
      isActive
        ? theme.mode === "light"
          ? "#1d1d1f"
          : "#f5f5f7"
        : "transparent"};
    transition: background-color 0.15s ease;
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }

  &:focus-visible {
    outline: 2px solid #0071e3;
    outline-offset: 4px;
  }

  @media (max-width: 480px) {
    margin: 0 8px;
    font-size: 0.7rem;
  }
`

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 130px 150px 130px;
  gap: 10px;
  margin: 10px auto 20px auto;
  width: 100%;
  max-width: 900px;
  justify-content: center;

  > * {
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  input[type="search"],
  select {
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#161616"};
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    border-radius: 8px;
    padding: 9px 14px;
    font-size: 0.84rem;
    outline: none;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #0071e3;
    }

    &::placeholder {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    }
  }

  select {
    cursor: pointer;
  }
`

const IntroText = styled.p`
  max-width: 560px;
  margin: 0 auto 12px;

  &:last-of-type {
    margin-bottom: 24px;
  }
`

const StyledFeaturedSection = styled.section`
  margin: 0 auto 28px;
  max-width: 900px;

  h4 {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    margin: 0 0 12px;
    padding-left: 2px;
  }
`

const StyledSectionLabel = styled.h4`
  scroll-margin-top: 90px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
  margin: 0 auto 12px;
  padding-left: 2px;
  max-width: 900px;
`

const ShowAllButton = styled.button`
  display: block;
  margin: 12px auto 4px;
  background: none;
  border: none;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
  font-size: 0.78rem;
  font-family: var(--font-mono);
  cursor: pointer;
  padding: 6px 0;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  }
`

const ResearchMap = styled.nav`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  width: 100%;
  max-width: 670px;
  margin: 4px auto 28px;

  @media (max-width: 480px) {
    gap: 8px;

    button {
      padding: 10px 12px 11px;
    }

    .thread-label {
      font-size: 0.88rem;
    }

    .thread-blurb {
      display: none;
    }
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    text-align: left;
    padding: 12px 14px 13px;
    border-radius: 10px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2c2b29")};
    background: ${({ theme }) =>
      theme.mode === "light" ? "#fbfbfd" : "#171615"};
    color: inherit;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease,
      transform 0.15s ease;

    &:hover {
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#a1a1a6" : "#4a4845"};
    }

    &:focus-visible {
      outline: 2px solid #0071e3;
      outline-offset: 2px;
    }

    &.active {
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#0071e3" : "#2997ff"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#eef5fd" : "rgba(41, 151, 255, 0.10)"};
    }

    @media (prefers-reduced-motion: no-preference) {
      &:hover {
        transform: translateY(-1px);
      }
    }
  }

  .thread-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    gap: 8px;
  }

  .thread-label {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    text-wrap: balance;
  }

  .thread-count {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-top: auto;
    padding-top: 6px;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.02em;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#9a9894")};
    font-variant-numeric: tabular-nums;

    svg {
      width: 10px;
      height: 10px;
      transition: transform 0.15s ease;
    }
  }

  button:hover .thread-count svg {
    transform: translateX(2px);
  }

  button.active .thread-count {
    color: ${({ theme }) => (theme.mode === "light" ? "#0071e3" : "#2997ff")};
  }

  .thread-blurb {
    font-size: 0.74rem;
    line-height: 1.45;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#9a9894")};
  }
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

const ActiveFilterNote = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 10px;
  text-transform: none;
  letter-spacing: 0;

  button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#0071e3" : "#2997ff")};
    background: transparent;
    color: ${({ theme }) => (theme.mode === "light" ? "#0071e3" : "#2997ff")};
    font-family: var(--font-mono);
    font-size: 0.66rem;
    cursor: pointer;
  }
`

const Experience = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              technologies {
                name
              }
            }
            html
          }
        }
      }
      publications: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/publications/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              slug
              authors
              date
              venue
              arxiv
              googlescholar
              semanticscholar
              paperurl
              code
              slides
              abstract
              bibtex
              tags
              teaser
              featured
              technologies {
                name
              }
            }
            html
          }
        }
      }
      education: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/education/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              venue
              degree
              gpa
              range
              technologies {
                name
              }
            }
            html
          }
        }
      }
    }
  `)

  const jobsData = data.jobs.edges
  const publicationsData = data.publications.edges
  const educationData = data.education.edges
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeContentType, setActiveContentType] = useState("publications")

  // Honor a tab signal from the URL hash on mount, the sidebar at
  // runtime via the experience-tab custom event, and any later
  // hashchange events (back/forward navigation).
  useEffect(() => {
    if (typeof window === "undefined") return
    const HASH_TO_TAB = { education: "education", experience: "jobs" }
    const applyHash = () => {
      const id = window.location.hash.replace("#", "")
      if (HASH_TO_TAB[id]) setActiveContentType(HASH_TO_TAB[id])
    }
    applyHash()
    const tabHandler = e => {
      if (e.detail) setActiveContentType(e.detail)
    }
    window.addEventListener("experience-tab", tabHandler)
    window.addEventListener("hashchange", applyHash)
    return () => {
      window.removeEventListener("experience-tab", tabHandler)
      window.removeEventListener("hashchange", applyHash)
    }
  }, [])

  const [showCourses, setShowCourses] = useState({})
  const [expandedCards, setExpandedCards] = useState({})
  const [showAllPubs, setShowAllPubs] = useState(false)
  const [copiedBib, setCopiedBib] = useState(null)
  const copyBibtex = (key, bib) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return
    navigator.clipboard.writeText(bib.trim()).then(() => {
      setCopiedBib(key)
      setTimeout(() => setCopiedBib(c => (c === key ? null : c)), 1600)
    })
  }

  // Publication filters
  const [pubQuery, setPubQuery] = useState("")
  const [pubYear, setPubYear] = useState("All")
  const [pubVenue, setPubVenue] = useState("All")
  const [pubTag, setPubTag] = useState("All")
  const [pubThread, setPubThread] = useState(null)
  const allPubsRef = useRef(null)

  const pubYears = useMemo(() => {
    const set = new Set()
    publicationsData.forEach(({ node }) => {
      const d = node.frontmatter.date
      if (d) set.add(new Date(d).getFullYear())
    })
    return Array.from(set).sort((a, b) => b - a)
  }, [publicationsData])

  const pubVenues = useMemo(() => {
    const set = new Set()
    publicationsData.forEach(({ node }) => {
      const v = node.frontmatter.venue
      if (v) set.add(v)
    })
    return Array.from(set).sort()
  }, [publicationsData])

  const pubTags = useMemo(() => {
    const set = new Set()
    publicationsData.forEach(({ node }) => {
      (node.frontmatter.tags || []).forEach(t => t && set.add(t))
    })
    return Array.from(set).sort()
  }, [publicationsData])

  const featuredPublications = useMemo(() => {
    return publicationsData
      .filter(({ node }) => typeof node.frontmatter.featured === "number")
      .sort((a, b) => a.node.frontmatter.featured - b.node.frontmatter.featured)
  }, [publicationsData])

  const filteredPublications = useMemo(() => {
    const q = pubQuery.trim().toLowerCase()
    return publicationsData.filter(({ node }) => {
      const fm = node.frontmatter
      const y = fm.date ? new Date(fm.date).getFullYear().toString() : ""
      const matchesYear = pubYear === "All" || y === String(pubYear)
      const matchesVenue = pubVenue === "All" || fm.venue === pubVenue
      const matchesTag = pubTag === "All" || (fm.tags || []).includes(pubTag)
      const hay = `${fm.title || ""} ${fm.authors || ""} ${fm.venue || ""} ${(
        fm.tags || []
      ).join(" ")}`.toLowerCase()
      const matchesQuery = q === "" || hay.includes(q)
      const thread = RESEARCH_THREADS.find(t => t.id === pubThread)
      const matchesThread =
        !thread || (fm.tags || []).some(t => thread.tags.includes(t))
      return (
        matchesYear &&
        matchesVenue &&
        matchesTag &&
        matchesQuery &&
        matchesThread
      )
    })
  }, [publicationsData, pubQuery, pubYear, pubVenue, pubTag, pubThread])

  const threadCounts = useMemo(() => {
    const counts = {}
    RESEARCH_THREADS.forEach(t => {
      counts[t.id] = publicationsData.filter(({ node }) =>
        (node.frontmatter.tags || []).some(tag => t.tags.includes(tag))
      ).length
    })
    return counts
  }, [publicationsData])

  const scrollToAllPubs = () => {
    if (!allPubsRef.current) return
    allPubsRef.current.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    })
  }

  const selectThread = id => {
    setActiveContentType("publications")
    setShowAllPubs(true)
    setPubThread(prev => (prev === id ? null : id))
    setTimeout(scrollToAllPubs, 50)
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  const activeData =
    activeContentType === "jobs"
      ? jobsData
      : activeContentType === "publications"
      ? publicationsData
      : educationData

  // Limit publications unless expanded (works on all devices)
  const PUB_LIMIT = 5
  const limitedPublications = !showAllPubs
    ? filteredPublications.slice(0, PUB_LIMIT)
    : filteredPublications

  const displayData =
    activeContentType === "publications" ? limitedPublications : activeData

  const hasMorePubs = filteredPublications.length > PUB_LIMIT

  const toggleCourses = i => {
    setShowCourses(prevState => ({
      ...prevState,
      [i]: !prevState[i],
    }))
  }

  const toggleCard = key => {
    setExpandedCards(prevState => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const countBullets = html => {
    if (!html) return 0
    const matches = html.match(/<li[\s>]/g)
    return matches ? matches.length : 0
  }

  const renderAuthors = authorsStr => {
    if (!authorsStr) return null
    const names = authorsStr
      .split(",")
      .map(n => n.trim())
      .filter(Boolean)

    return names.map((name, idx) => {
      const key = name.toLowerCase()
      const url = collaboratorLinks[key]
      const isMe = /jacob\s+dineen/i.test(name)
      const content = isMe ? (
        <span className="me">{name}</span>
      ) : url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        <span>{name}</span>
      )
      return (
        <span key={`${key}-${idx}`}>
          {content}
          {idx < names.length - 1 ? ", " : null}
        </span>
      )
    })
  }

  const renderPublicationCard = (node, key, inFeaturedRow = false) => {
    const { frontmatter } = node
    const { venue, title, date } = frontmatter
    const formatted = date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })
      : null
    const isArxivPdf =
      frontmatter.paperurl && /arxiv\.org/.test(frontmatter.paperurl)

    const isFeaturedInMainList =
      typeof frontmatter.featured === "number" && !inFeaturedRow

    return (
      <PublicationListItem
        key={key}
        featuredAccent={isFeaturedInMainList}
        $featuredCard={inFeaturedRow}
      >
        {inFeaturedRow && frontmatter.teaser && (
          <TransitionLink
            to={frontmatter.slug || "/"}
            className="thumb"
            aria-label={`Read more about ${title}`}
            tabIndex={-1}
          >
            <img
              src={withPrefix(frontmatter.teaser)}
              alt={`Key figure from ${title}`}
              loading="lazy"
              decoding="async"
            />
          </TransitionLink>
        )}
        {frontmatter.slug ? (
          <span
            className="title"
            style={{
              viewTransitionName: `pub-title-${frontmatter.slug.replace(
                /\W+/g,
                "-"
              )}`,
            }}
          >
            <TransitionLink
              to={frontmatter.slug}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {title || "N/A"}
            </TransitionLink>
            {!inFeaturedRow && (frontmatter.teaser || frontmatter.abstract) && (
              <span className="preview" aria-hidden="true">
                {frontmatter.teaser && (
                  <img
                    src={withPrefix(frontmatter.teaser)}
                    alt={`Key figure from ${title}`}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {frontmatter.abstract && (
                  <span className="preview-text">
                    {abstractSnippet(frontmatter.abstract)}
                  </span>
                )}
                <span className="preview-meta">
                  {[venue, formatted].filter(Boolean).join(" · ")}
                </span>
              </span>
            )}
          </span>
        ) : (
          <span className="title">{title || "N/A"}</span>
        )}
        {frontmatter.authors && (
          <span className="authors">{renderAuthors(frontmatter.authors)}</span>
        )}
        <div className="meta">
          {venue && <span className={`chip ${venueTier(venue)}`}>{venue}</span>}
          {formatted && <span className="date">{formatted}</span>}
          {frontmatter.arxiv && (
            <a
              href={frontmatter.arxiv}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-link"
              title="arXiv"
              aria-label={`arxiv — ${title}`}
            >
              <IconArxiv />
              <span>arxiv</span>
            </a>
          )}
          {frontmatter.arxiv && (
            <a
              href={frontmatter.arxiv.replace(
                /^https?:\/\/(www\.)?arxiv\.org\b/,
                "https://www.alphaxiv.org"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-link"
              title="alphaXiv"
              aria-label={`alphaxiv — ${title}`}
            >
              <IconAlphaxiv />
              <span>alphaxiv</span>
            </a>
          )}
          {frontmatter.paperurl && (!isArxivPdf || !frontmatter.arxiv) && (
            <a
              href={frontmatter.paperurl}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-link"
              title="PDF"
              aria-label={`pdf — ${title}`}
            >
              <IconExternal />
              <span>pdf</span>
            </a>
          )}
          {frontmatter.slides && (
            <a
              href={withPrefix(frontmatter.slides)}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-link"
              title="Slides"
              aria-label={`slides — ${title}`}
            >
              <IconSlides />
              <span>slides</span>
            </a>
          )}
          {frontmatter.code && (
            <a
              href={frontmatter.code}
              target="_blank"
              rel="noopener noreferrer"
              className="chip-link"
              title="Code"
              aria-label={`code — ${title}`}
            >
              <IconGitHub />
              <span>code</span>
            </a>
          )}
          {frontmatter.bibtex && (
            <button
              type="button"
              className={`chip-link${copiedBib === key ? " copied" : ""}`}
              onClick={() => copyBibtex(key, frontmatter.bibtex)}
              title="Copy BibTeX"
              aria-label={`copy bibtex — ${title}`}
            >
              <span>{copiedBib === key ? "copied ✓" : "bibtex"}</span>
            </button>
          )}
          {frontmatter.slug && (
            <TransitionLink
              to={frontmatter.slug}
              className="chip-link"
              aria-label={`details — ${title}`}
            >
              <span>details</span>
              <IconChevronRight />
            </TransitionLink>
          )}
        </div>
        {!inFeaturedRow && frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="tags">
            {frontmatter.tags.map(t => (
              <button
                key={t}
                type="button"
                className={`tag${pubTag === t ? " active" : ""}`}
                onClick={() => setPubTag(pubTag === t ? "All" : t)}
                aria-label={`Filter by tag ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </PublicationListItem>
    )
  }

  return (
    <StyledJobsSection id="experience" ref={revealContainer}>
      <StyledText>
        <h3>Hey, I&apos;m Jake.</h3>
        <IntroText>
          I&apos;m a PhD student at{" "}
          <a
            href="https://arc-asu.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ASU&apos;s ARC Lab
          </a>{" "}
          working on LLM reasoning and alignment. Before that, ten years
          building ML infrastructure in fintech.
        </IntroText>

        <ResearchMap aria-label="Research threads">
          {RESEARCH_THREADS.map(t => (
            <button
              key={t.id}
              type="button"
              className={pubThread === t.id ? "active" : ""}
              aria-pressed={pubThread === t.id}
              onClick={() => selectThread(t.id)}
            >
              <span className="thread-label">{t.label}</span>
              <span className="thread-blurb">{t.blurb}</span>
              <span className="thread-count">
                {threadCounts[t.id]} papers
                <IconChevronRight />
              </span>
            </button>
          ))}
        </ResearchMap>

        <ContentTypeButtonsContainer>
          {[
            { id: "publications", label: "Publications", hash: "" },
            { id: "education", label: "Education", hash: "education" },
            { id: "jobs", label: "Experience", hash: "experience" },
          ].map(({ id, label, hash }) => (
            <ContentTypeButton
              key={id}
              onClick={() => {
                setActiveContentType(id)
                if (
                  typeof window !== "undefined" &&
                  window.history &&
                  window.history.replaceState
                ) {
                  const next = hash ? `#${hash}` : window.location.pathname
                  window.history.replaceState(null, "", next)
                }
              }}
              disabled={activeContentType === id}
              isActive={activeContentType === id}
            >
              {label}
            </ContentTypeButton>
          ))}
        </ContentTypeButtonsContainer>

        <div className="inner">
          {activeContentType === "publications" && (
            <StyledFilters>
              <input
                type="search"
                placeholder="Search title, authors, venue…"
                value={pubQuery}
                onChange={e => setPubQuery(e.target.value)}
                aria-label="Search publications"
              />
              <select
                value={pubYear}
                onChange={e => setPubYear(e.target.value)}
                aria-label="Filter by year"
              >
                <option value="All">All years</option>
                {pubYears.map(y => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                value={pubVenue}
                onChange={e => setPubVenue(e.target.value)}
                aria-label="Filter by venue"
              >
                <option value="All">All venues</option>
                {pubVenues.map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              {pubTags.length > 0 && (
                <select
                  value={pubTag}
                  onChange={e => setPubTag(e.target.value)}
                  aria-label="Filter by tag"
                >
                  <option value="All">All tags</option>
                  {pubTags.map(t => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}
            </StyledFilters>
          )}
          {activeContentType === "publications" &&
            featuredPublications.length > 0 && (
              <StyledFeaturedSection>
                <h4>Selected work</h4>
                <FeaturedGrid>
                  {featuredPublications.map(({ node }, i) =>
                    renderPublicationCard(node, `featured-${i}`, true)
                  )}
                </FeaturedGrid>
              </StyledFeaturedSection>
            )}
          {activeContentType === "publications" && (
            <StyledSectionLabel id="all-publications" ref={allPubsRef}>
              All publications
              {pubThread && (
                <ActiveFilterNote>
                  <button type="button" onClick={() => setPubThread(null)}>
                    {RESEARCH_THREADS.find(t => t.id === pubThread).label} ✕
                  </button>
                </ActiveFilterNote>
              )}
              {pubYear !== "All" && (
                <ActiveFilterNote>
                  <button type="button" onClick={() => setPubYear("All")}>
                    {pubYear} ✕
                  </button>
                </ActiveFilterNote>
              )}
            </StyledSectionLabel>
          )}
          <StyledTabList>
            {displayData.map(({ node }, i) => {
              if (activeContentType === "publications") {
                return renderPublicationCard(node, i)
              }
              const { frontmatter } = node
              const { company, venue, title } = frontmatter

              const isJob = activeContentType === "jobs"
              const cardTitle = isJob ? title : frontmatter.degree
              const cardSubtitle = isJob ? company : venue
              const range = frontmatter.range
              const gpa = frontmatter.gpa
              const technologies = frontmatter.technologies
              const html = node.html
              const cardKey = `${activeContentType}-${i}`
              const bulletCount = countBullets(html)
              const isCollapsible = bulletCount > 4
              const isExpanded = !!expandedCards[cardKey]

              return (
                <EntryListItem key={i}>
                  <span className="title">{cardTitle || "N/A"}</span>
                  {cardSubtitle && (
                    <span className="subtitle">{cardSubtitle}</span>
                  )}
                  {(range || gpa) && (
                    <div className="meta">
                      {range && <span className="chip">{range}</span>}
                      {gpa && <span className="chip">GPA {gpa}</span>}
                    </div>
                  )}
                  {html && (
                    <div
                      className={`body${
                        isCollapsible && !isExpanded ? " collapsed" : ""
                      }`}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  )}
                  {isCollapsible && (
                    <button
                      className={`card-toggle${isExpanded ? " expanded" : ""}`}
                      onClick={() => toggleCard(cardKey)}
                    >
                      <span>{isExpanded ? "Show less" : "Show more"}</span>
                      <IconChevronRight />
                    </button>
                  )}
                  {!isJob && technologies && technologies.length > 0 && (
                    <div className="coursework">
                      <button
                        className={`coursework-toggle${
                          showCourses[i] ? " expanded" : ""
                        }`}
                        onClick={() => toggleCourses(i)}
                      >
                        <span>
                          {showCourses[i]
                            ? "Hide coursework"
                            : "Show coursework"}
                        </span>
                        <IconChevronRight />
                      </button>
                      {showCourses[i] && (
                        <p className="coursework-list">
                          {technologies.map(tech => tech.name).join(" · ")}
                        </p>
                      )}
                    </div>
                  )}
                </EntryListItem>
              )
            })}
          </StyledTabList>

          {activeContentType === "publications" && hasMorePubs && (
            <ShowAllButton onClick={() => setShowAllPubs(!showAllPubs)}>
              {showAllPubs
                ? "Show less"
                : `Show all ${filteredPublications.length} publications`}
            </ShowAllButton>
          )}
        </div>
      </StyledText>
    </StyledJobsSection>
  )
}

export default Experience
