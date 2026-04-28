import React from "react"
import PropTypes from "prop-types"
import {
  IconBookmark,
  IconExternal,
  IconGitHub,
  IconLinkedin,
  IconArxiv,
  IconSemanticScholar,
  IconGScholar,
  IconTwitter,
  IconSlides,
  IconShare,
} from "@components/icons"
import IconGmail from "./gmail"

const Icon = ({ name }) => {
  switch (name) {
    case "Bookmark":
      return <IconBookmark />
    case "External":
      return <IconExternal />
    case "GitHub":
      return <IconGitHub />
    case "Linkedin":
      return <IconLinkedin />
    case "Arxiv":
      return <IconArxiv />
    case "SemanticScholar":
      return <IconSemanticScholar />
    case "Gmail":
      return <IconGmail />
    case "GScholar":
      return <IconGScholar />
    case "Twitter":
      return <IconTwitter />
    case "Slides":
      return <IconSlides />
    case "Share":
      return <IconShare />
    default:
      return <IconExternal />
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Icon
