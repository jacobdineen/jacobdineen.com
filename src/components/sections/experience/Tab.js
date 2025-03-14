import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import StyledTabList from "./StyledTabList"
import StyledTabButton from "./StyledTabButton"
import StyledTabPanels from "./StyledTabPanels"
import StyledTabPanel from "./StyledTabPanel"

const Tab = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(0)
  const tabsRef = useRef([])
  const tabPanelsRef = useRef([])
  const containerRef = useRef(null)

  const focusTab = id => {
    setActiveTabId(id)
    tabsRef.current[id].focus()
  }

  const onKeyDown = e => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault()
        const prev = activeTabId === 0 ? tabsRef.current.length - 1 : activeTabId - 1
        focusTab(prev)
        break
      }
      case "ArrowDown": {
        e.preventDefault()
        const next = activeTabId === tabsRef.current.length - 1 ? 0 : activeTabId + 1
        focusTab(next)
        break
      }
      default: {
        break
      }
    }
  }

  useEffect(() => {
    const currentTab = tabPanelsRef.current[activeTabId]
    if (currentTab) {
      const { offsetHeight } = currentTab
      tabPanelsRef.current.forEach(panel => {
        panel.style.height = `${offsetHeight}px`
      })
    }
  }, [activeTabId])

  return (
    <div>
      <StyledTabList role="tablist" aria-label="Job tabs" onKeyDown={onKeyDown}>
        <div ref={containerRef}>
          {data &&
            data.map(({ company }, i) => (
              <StyledTabButton
                key={i}
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabsRef.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                tabIndex={activeTabId === i ? "0" : "-1"}
                aria-selected={activeTabId === i ? true : false}
                aria-controls={`panel-${i}`}
              >
                <span>{company}</span>
              </StyledTabButton>
            ))}
        </div>
      </StyledTabList>

      <StyledTabPanels>
        {data &&
          data.map(({ title, url, company, range, points }, i) => (
            <StyledTabPanel
              key={i}
              isActive={activeTabId === i}
              id={`panel-${i}`}
              role="tabpanel"
              ref={el => (tabPanelsRef.current[i] = el)}
              tabIndex={activeTabId === i ? "0" : "-1"}
              aria-labelledby={`tab-${i}`}
              aria-hidden={activeTabId !== i}
            >
              <h3>
                <span>{title}</span>
                <span className="company">
                  &nbsp;@&nbsp;
                  <a href={url} className="inline-link">
                    {company}
                  </a>
                </span>
              </h3>

              <p className="range">{range}</p>
              
              <ul>
                {points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </StyledTabPanel>
          ))}
      </StyledTabPanels>
    </div>
  )
}

Tab.propTypes = {
  data: PropTypes.array.isRequired,
}

export default Tab
