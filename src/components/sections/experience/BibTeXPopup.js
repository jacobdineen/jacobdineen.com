import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const PopupContent = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--white)" : "var(--navy)"};
  border-radius: 10px;
  box-shadow: 0 15px 30px -10px ${({ theme }) => (theme.mode === "light" ? "rgba(0, 0, 0, 0.2)" : "var(--navy-shadow)")};
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: auto;
  z-index: 1001;
  padding: 25px;
  position: relative;
  animation: slideUp 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

const BibtexContent = styled.div`
  background-color: ${({ theme }) =>
    theme.mode === "light" ? "var(--lightest-slate)" : "var(--light-navy)"};
  padding: 20px;
  border-radius: 8px;
  font-size: 14px;
  font-family: var(--font-mono);
  white-space: pre-wrap;
  word-break: break-word;
  color: ${({ theme }) =>
    theme.mode === "light" ? "var(--dark-navy)" : "var(--slate)"};
  margin-bottom: 20px;
  position: relative;
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 0, 0, 0.05)"
        : "rgba(255, 255, 255, 0.05)"};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`

const Button = styled.button`
  background-color: ${({ primary, theme }) =>
    primary
      ? "var(--green)"
      : theme.mode === "light"
      ? "var(--lightest-slate)"
      : "var(--light-navy)"};
  color: ${({ primary, theme }) =>
    primary
      ? theme.mode === "light"
        ? "var(--navy)"
        : "var(--navy)"
      : theme.mode === "light"
      ? "var(--dark-navy)"
      : "var(--lightest-slate)"};
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px
    ${({ theme }) =>
      theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.3)"};

  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px
      ${({ theme }) =>
        theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.4)"};
    background-color: ${({ primary }) =>
      primary ? "#86efac" : "var(--light-navy)"};
  }

  &:active {
    transform: translateY(1px);
  }
`

const Notification = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ success, theme }) =>
    success
      ? theme.mode === "light"
        ? "#d1fae5"
        : "#065f46"
      : theme.mode === "light"
      ? "#fee2e2"
      : "#7f1d1d"};
  color: ${({ success, theme }) =>
    success
      ? theme.mode === "light"
        ? "#065f46"
        : "#d1fae5"
      : theme.mode === "light"
      ? "#7f1d1d"
      : "#fee2e2"};
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1100;
  opacity: 0;
  animation: notification 3s ease-in-out forwards;

  @keyframes notification {
    0% {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    10% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    90% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
  }
`

const BibTeXPopup = ({ bibtex, onClose }) => {
  const [notification, setNotification] = useState(null)

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

    setNotification({
      message: `Downloaded as ${filename}`,
      success: true,
    })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleCopy = () => {
    navigator.clipboard
      .writeText(bibtex)
      .then(() => {
        setNotification({
          message: "BibTeX copied to clipboard!",
          success: true,
        })

        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(() => {
        setNotification({
          message: "Failed to copy. Please try again.",
          success: false,
        })

        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={e => e.stopPropagation()}>
        <BibtexContent>{bibtex}</BibtexContent>

        <ButtonContainer>
          <Button onClick={handleCopy}>Copy to Clipboard</Button>
          <Button primary onClick={handleDownload}>
            Download .bib File
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ButtonContainer>
      </PopupContent>

      {notification && (
        <Notification success={notification.success}>
          {notification.message}
        </Notification>
      )}
    </PopupOverlay>
  )
}

// Define prop types
BibTeXPopup.propTypes = {
  bibtex: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default BibTeXPopup
