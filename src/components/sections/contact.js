import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
// import { usePrefersReducedMotion } from "@hooks"

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 48px 32px;
  position: relative;
  z-index: 10;

  background: ${({ theme }) =>
    theme.mode === "light"
      ? "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)"
      : "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)"};
  backdrop-filter: blur(10px);
  border: 1px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(226, 232, 240, 0.8)"
        : "rgba(100, 255, 218, 0.1)"};
  border-radius: 24px;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 8px 32px rgba(0, 0, 0, 0.08)"
      : "0 8px 32px rgba(0, 0, 0, 0.3)"};

  /* Force visibility and override ScrollReveal */
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;

  @media (min-width: 768px) {
    padding: 64px 48px;
    max-width: 700px;
  }

  @media (min-width: 1080px) {
    padding: 72px 56px;
    max-width: 800px;
  }

  .title {
    font-size: clamp(1.8rem, 4vw, 2.2rem);
    margin-bottom: 2rem;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", sans-serif;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(135deg, #2d3748 0%, #4a5568 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)"};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    line-height: 1.2;
    opacity: 1;

    @media (min-width: 768px) {
      margin-bottom: 3rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 0;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
    margin-bottom: 2rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#64748b" : "#94a3b8")};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
  }

  input,
  textarea {
    width: 100%;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(15, 23, 42, 0.8)"};
    backdrop-filter: blur(10px);
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(226, 232, 240, 0.8)"
          : "rgba(100, 255, 218, 0.2)"};
    color: ${({ theme }) => (theme.mode === "light" ? "#1e293b" : "#e2e8f0")};
    font-size: 1rem;
    padding: 16px 20px;
    margin-top: 8px;
    text-align: left;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    border-radius: 12px;
    box-shadow: ${({ theme }) =>
      theme.mode === "light"
        ? "0 4px 16px rgba(0, 0, 0, 0.04)"
        : "0 4px 16px rgba(0, 0, 0, 0.2)"};

    &:focus {
      outline: none;
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#667eea" : "#00c9ff"};
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(255, 255, 255, 1)"
          : "rgba(15, 23, 42, 0.95)"};
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 0 0 3px rgba(102, 126, 234, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)"
          : "0 0 0 3px rgba(0, 201, 255, 0.1), 0 8px 24px rgba(0, 0, 0, 0.3)"};
      transform: translateY(-1px);
    }

    &::placeholder {
      color: ${({ theme }) => (theme.mode === "light" ? "#94a3b8" : "#64748b")};
      opacity: 0.8;
      font-size: 0.95rem;
      transition: all 0.3s ease;
    }

    &:focus::placeholder {
      opacity: 0.4;
      transform: translateY(-2px);
    }
  }

  textarea {
    min-height: 140px;
    resize: vertical;
    line-height: 1.6;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    width: 100%;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      gap: 20px;
    }
  }

  button {
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(15, 23, 42, 0.8)"};
    backdrop-filter: blur(10px);
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(102, 126, 234, 0.3)"
          : "rgba(0, 201, 255, 0.3)"};
    color: ${({ theme }) => (theme.mode === "light" ? "#667eea" : "#00c9ff")};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 14px 24px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 1;
    border-radius: 12px;
    min-width: 120px;
    box-shadow: ${({ theme }) =>
      theme.mode === "light"
        ? "0 4px 16px rgba(0, 0, 0, 0.08)"
        : "0 4px 16px rgba(0, 0, 0, 0.2)"};

    &[type="submit"] {
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          : "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)"};
      color: white;
      border-color: transparent;
      font-weight: 600;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 12px 32px rgba(102, 126, 234, 0.2)"
          : "0 12px 32px rgba(0, 201, 255, 0.2)"};

      &[type="submit"] {
        box-shadow: ${({ theme }) =>
          theme.mode === "light"
            ? "0 12px 32px rgba(102, 126, 234, 0.4)"
            : "0 12px 32px rgba(0, 201, 255, 0.4)"};
      }

      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px) scale(0.98);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }

  .form-status {
    margin-top: 24px;
    padding: 16px 20px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(34, 197, 94, 0.1)"
        : "rgba(0, 201, 255, 0.1)"};
    color: ${({ theme }) => (theme.mode === "light" ? "#16a34a" : "#00c9ff")};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      sans-serif;
    border-radius: 12px;
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(34, 197, 94, 0.2)"
          : "rgba(0, 201, 255, 0.2)"};
    text-align: center;
    opacity: 0;
    animation: slideUpFadeIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      forwards;
  }

  @keyframes slideUpFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const useTypewriterEffect = (text, trigger, delay = 100) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!trigger) return

    setDisplayedText("") // Reset displayed text when trigger changes
    let index = 0
    const intervalId = setInterval(() => {
      setDisplayedText(prev => prev + text[index])
      index++
      if (index >= text.length) {
        clearInterval(intervalId)
      }
    }, delay)

    return () => clearInterval(intervalId)
  }, [trigger, text, delay])

  return displayedText
}

const useInView = (ref, options) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isInView
}

const Contact = () => {
  const revealContainer = useRef(null)
  const [formStatus, setFormStatus] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const formRef = useRef(null)
  const isInView = useInView(formRef, { threshold: 0.1 })

  const namePlaceholder = useTypewriterEffect(
    "Please enter your name",
    isInView && currentStep === 1
  )
  const emailPlaceholder = useTypewriterEffect(
    "Please enter your email",
    isInView && currentStep === 2
  )
  const messagePlaceholder = useTypewriterEffect(
    "Please enter your message",
    isInView && currentStep === 3
  )

  // Commented out ScrollReveal to fix visibility issue
  // useEffect(() => {
  //   if (prefersReducedMotion) {
  //     return
  //   }
  //   sr.reveal(revealContainer.current, srConfig())
  // }, [prefersReducedMotion])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleNext = e => {
    e.preventDefault()
    setCurrentStep(currentStep + 1)
  }

  const handlePrev = e => {
    e.preventDefault()
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)
    const endpoint = "https://formspree.io/f/xkgwgjqn"

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })

    if (response.ok) {
      form.reset()
      setFormStatus("Thank you! Your message has been sent.")
    } else {
      setFormStatus("Oops! There was a problem submitting your form.")
    }
  }

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="title">Get In Touch</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div style={{ width: "100%" }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={namePlaceholder}
              required
            />
            <div className="button-group">
              <button onClick={handleNext}>Next →</button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div style={{ width: "100%" }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={emailPlaceholder}
              required
            />
            <div className="button-group">
              <button onClick={handlePrev}>← Back</button>
              <button onClick={handleNext}>Next →</button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div style={{ width: "100%" }}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={messagePlaceholder}
              required
            />
            <div className="button-group">
              <button onClick={handlePrev}>← Back</button>
              <button type="submit">Send Message ↗</button>
            </div>
          </div>
        )}
      </form>
      {formStatus && <p className="form-status">{formStatus}</p>}
    </StyledContactSection>
  )
}

export default Contact
