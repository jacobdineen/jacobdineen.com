import React from "react"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"

// WHY: wraps Gatsby's Link with View Transitions API for smooth list -> detail
// navigation when supported. Falls back to plain Link behavior otherwise.
const TransitionLink = ({ to, onClick, children, ...rest }) => {
  const handleClick = e => {
    if (onClick) onClick(e)
    if (e.defaultPrevented) return
    // let modifier-clicks open in new tab/window per native behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) {
      return
    }
    if (typeof document === "undefined" || !document.startViewTransition) {
      return // unsupported browser: let Gatsby Link handle it normally
    }
    e.preventDefault()
    document.startViewTransition(() => navigate(to))
  }

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}

TransitionLink.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default TransitionLink
