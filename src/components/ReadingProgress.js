import React, { useEffect, useState } from "react"
import styled from "styled-components"

// WHY: thin top progress bar that tracks scroll through the page. Lives at the
// top of long detail pages (publications + blog posts).
const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: #0071e3;
  width: ${({ progress }) => `${progress}%`};
  z-index: 900;
  transition: width 0.08s linear;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      // Pages can scroll either on window or on a #content element (desktop layout).
      const main = document.getElementById("content")
      const isMainScrollable =
        main && main.scrollHeight - main.clientHeight > 10
      const scrollTop = isMainScrollable ? main.scrollTop : window.scrollY
      const scrollHeight = isMainScrollable
        ? main.scrollHeight - main.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) {
        setProgress(0)
        return
      }
      const pct = Math.max(0, Math.min(100, (scrollTop / scrollHeight) * 100))
      setProgress(pct)
    }
    update()
    const main = document.getElementById("content")
    window.addEventListener("scroll", update, { passive: true })
    if (main) main.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      if (main) main.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return <Bar progress={progress} aria-hidden="true" />
}

export default ReadingProgress
