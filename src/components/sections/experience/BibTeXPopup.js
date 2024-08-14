import React from "react"
import PropTypes from "prop-types" // Import PropTypes
import PopupContainer from "./PopupContainer"
import Overlay from "./Overlay"
import Button from "./Button"

const BibTeXPopup = ({ bibtex, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(bibtex)
    alert("BibTeX copied to clipboard!")
  }

  const handleDownload = () => {
    const blob = new Blob([bibtex], { type: "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "citation.bib"
    link.click()
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <PopupContainer>
        <pre>{bibtex}</pre>
        <Button onClick={handleCopy}>Copy</Button>
        <Button onClick={handleDownload}>Download</Button>
        <Button onClick={onClose}>Close</Button>
      </PopupContainer>
    </>
  )
}

// Define prop types
BibTeXPopup.propTypes = {
  bibtex: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default BibTeXPopup
