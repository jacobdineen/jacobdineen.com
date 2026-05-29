import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import styled from "styled-components"

const SECTION_ITEMS = [
  {
    id: "section-publications",
    type: "section",
    title: "Publications",
    path: "/publications",
  },
  {
    id: "section-collaborators",
    type: "section",
    title: "Collaborators",
    path: "/collaborators",
  },
  {
    id: "section-experience",
    type: "section",
    title: "Experience",
    path: "/#experience",
  },
  { id: "section-news", type: "section", title: "News", path: "/#news" },
  { id: "section-cv", type: "section", title: "CV", path: "/#cv" },
  {
    id: "section-contact",
    type: "section",
    title: "Contact",
    path: "/#contact",
  },
  {
    id: "section-pensieve",
    type: "section",
    title: "Pensieve (blog)",
    path: "/pensieve",
  },
]

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0, 0, 0, 0.35)" : "rgba(0, 0, 0, 0.6)"};
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 12vh;

  @media (max-width: 768px) {
    padding-top: 6vh;
  }
`

const Panel = styled.div`
  width: min(640px, calc(100vw - 32px));
  max-height: 70vh;
  background: ${({ theme }) =>
    theme.mode === "light" ? "#ffffff" : "#161616"};
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  font-size: 1rem;
  font-family: var(--font-sans);
  padding: 18px 20px;
  border-bottom: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};

  &::placeholder {
    color: ${({ theme }) => (theme.mode === "light" ? "#a1a1a6" : "#6e6e73")};
  }
`

const ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 6px 0;
  overflow-y: auto;
  flex: 1;
`

const ResultItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 20px;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? (theme.mode === "light" ? "#f5f5f7" : "#1f1f1f") : "transparent"};

  .row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    justify-content: space-between;
  }

  .title {
    font-family: var(--font-serif);
    font-size: 0.95rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .type {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    flex-shrink: 0;
  }

  .meta {
    font-size: 0.74rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
    line-height: 1.4;
  }
`

const Empty = styled.div`
  padding: 28px 20px;
  text-align: center;
  font-size: 0.85rem;
  color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 16px;
  border-top: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};

  kbd {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    margin: 0 2px;
    color: inherit;
  }
`

const HintButton = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 800;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(255,255,255,0.9)" : "rgba(22,22,22,0.9)"};
  color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
  font-family: var(--font-mono);
  font-size: 0.7rem;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: #0071e3;
    border-color: #0071e3;
  }

  kbd {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    color: inherit;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const score = (haystack, needle) => {
  if (!needle) return 0
  const h = haystack.toLowerCase()
  const n = needle.toLowerCase()
  if (h === n) return 1000
  if (h.startsWith(n)) return 500
  const idx = h.indexOf(n)
  if (idx === -1) return -1
  // earlier matches and shorter haystacks score higher
  return 200 - idx - h.length / 100
}

const CommandPalette = () => {
  const data = useStaticQuery(graphql`
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
              authors
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
              tags
            }
          }
        }
      }
    }
  `)

  const items = useMemo(() => {
    const pubs = data.publications.edges
      .filter(({ node }) => node.frontmatter.slug)
      .map(({ node }, i) => {
        const fm = node.frontmatter
        const year = fm.date ? new Date(fm.date).getFullYear() : ""
        return {
          id: `pub-${i}`,
          type: "publication",
          title: fm.title,
          path: fm.slug,
          meta: [fm.venue, year].filter(Boolean).join(" · "),
          searchText: `${fm.title || ""} ${fm.authors || ""} ${
            fm.venue || ""
          } ${(fm.tags || []).join(" ")}`,
        }
      })
    const posts = data.posts.edges
      .filter(({ node }) => node.frontmatter.slug)
      .map(({ node }, i) => {
        const fm = node.frontmatter
        return {
          id: `post-${i}`,
          type: "post",
          title: fm.title,
          path: fm.slug,
          meta: fm.description || "",
          searchText: `${fm.title || ""} ${fm.description || ""} ${(
            fm.tags || []
          ).join(" ")}`,
        }
      })
    const sections = SECTION_ITEMS.map(s => ({
      ...s,
      meta: "",
      searchText: s.title,
    }))
    return [...sections, ...pubs, ...posts]
  }, [data])

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const filtered = useMemo(() => {
    const q = query.trim()
    if (!q) return items.slice(0, 30)
    return items
      .map(item => ({ item, s: score(item.searchText, q) }))
      .filter(({ s }) => s > -1)
      .sort((a, b) => b.s - a.s)
      .slice(0, 30)
      .map(({ item }) => item)
  }, [items, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, open])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
  }, [])

  const select = useCallback(
    item => {
      if (!item) return
      close()
      // hash links go via router, slugs via navigate
      if (item.path.startsWith("/#")) {
        if (typeof window !== "undefined") {
          window.location.href = item.path
        }
      } else {
        navigate(item.path)
      }
    },
    [close]
  )

  // Global hotkey
  useEffect(() => {
    const onKey = e => {
      const isMac = /Mac/.test(navigator.platform)
      const mod = isMac ? e.metaKey : e.ctrlKey
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Scroll active item into view
  useEffect(() => {
    if (!open || !listRef.current) return
    const el = listRef.current.children[activeIndex]
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex, open])

  const onInputKey = e => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      select(filtered[activeIndex])
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  const isMac =
    typeof navigator !== "undefined" && /Mac/.test(navigator.platform)
  const modKey = isMac ? "⌘" : "Ctrl"

  return (
    <>
      <HintButton
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <span>Search</span>
        <kbd>{modKey}</kbd>
        <kbd>K</kbd>
      </HintButton>
      {open && (
        <Backdrop onMouseDown={close} role="dialog" aria-modal="true">
          <Panel onMouseDown={e => e.stopPropagation()}>
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Search publications, posts, sections…"
              aria-label="Command palette search"
            />
            {filtered.length === 0 ? (
              <Empty>No matches</Empty>
            ) : (
              <ResultList ref={listRef}>
                {filtered.map((item, i) => (
                  <ResultItem
                    key={item.id}
                    active={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={e => {
                      e.preventDefault()
                      select(item)
                    }}
                  >
                    <div className="row">
                      <span className="title">{item.title}</span>
                      <span className="type">{item.type}</span>
                    </div>
                    {item.meta && <span className="meta">{item.meta}</span>}
                  </ResultItem>
                ))}
              </ResultList>
            )}
            <Footer>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navigate <kbd>Enter</kbd> select
              </span>
              <span>
                <kbd>Esc</kbd> close
              </span>
            </Footer>
          </Panel>
        </Backdrop>
      )}
    </>
  )
}

export default CommandPalette
