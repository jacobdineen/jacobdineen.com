import React from "react"
import PropTypes from "prop-types" // Import PropTypes

const BibTeXPopup = ({ bibtex, onClose }) => {
  const handleDownload = () => {
    // Extract citation key or arxiv ID from bibtex
    let filename = "citation.bib"
    
    // Try to get arxiv ID
    const arxivMatch = bibtex.match(/arxiv:(\d+\.\d+)/)
    if (arxivMatch) {
      filename = `arxiv_${arxivMatch[1]}.bib`
    } else {
      // Fallback to citation key if no arxiv ID
      const citationMatch = bibtex.match(/@\w+{([^,]+),/)
      if (citationMatch) {
        filename = `${citationMatch[1]}.bib`
      }
    }

    const blob = new Blob([bibtex], { type: "text/plain" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'var(--navy)',
      borderRadius: '10px',
      boxShadow: '0 10px 30px -15px var(--navy-shadow)',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 100,
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'var(--light-navy)',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '14px',
        fontFamily: 'var(--font-mono)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: 'var(--slate)',
        marginBottom: '15px'
      }}>
        {bibtex}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px'
      }}>
        <button
          onClick={() => {
            navigator.clipboard.writeText(bibtex);
          }}
          style={{
            backgroundColor: "#112240",
            color: "#64ffda",
            borderRadius: "5px",
            padding: "8px 15px",
            fontSize: "0.75rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          Copy
        </button>
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: "#112240",
            color: "#64ffda",
            borderRadius: "5px",
            padding: "8px 15px",
            fontSize: "0.75rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          Download
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "#112240",
            color: "#64ffda",
            borderRadius: "5px",
            padding: "8px 15px",
            fontSize: "0.75rem",
            border: "none",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Define prop types
BibTeXPopup.propTypes = {
  bibtex: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default BibTeXPopup
