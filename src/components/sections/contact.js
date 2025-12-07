import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
// import { usePrefersReducedMotion } from "@hooks"

const StyledContactSection = styled.section`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 60px 20px;
  position: relative;
  z-index: 10;

  /* Force visibility and override ScrollReveal */
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;

  @media (min-width: 768px) {
    padding: 80px 40px;
  }

  @media (min-width: 1080px) {
    padding: 100px 60px;
  }

  .title {
    font-size: clamp(2rem, 5vw, 2.8rem);
    margin-bottom: 2.5rem;
    font-weight: 600;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "Helvetica Neue", sans-serif;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
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
    max-width: 600px;
    margin: 0 auto;
    padding: 0;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
  }

  input,
  textarea {
    width: 100%;
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f5f5f7" : "#1d1d1f"};
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#3d3d3d")};
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    font-size: 1rem;
    padding: 16px 20px;
    margin-top: 8px;
    text-align: left;
    transition: all 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    border-radius: 12px;

    &:focus {
      outline: none;
      border-color: #0071e3;
      background: ${({ theme }) =>
        theme.mode === "light" ? "#ffffff" : "#2d2d2d"};
    }

    &::placeholder {
      color: ${({ theme }) => (theme.mode === "light" ? "#86868b" : "#6e6e73")};
      font-size: 0.95rem;
    }
  }

  textarea {
    min-height: 160px;
    resize: vertical;
    line-height: 1.6;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 24px;
    width: 100%;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      gap: 16px;
    }
  }

  button {
    background: transparent;
    border: 1px solid #0071e3;
    color: #0071e3;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 980px;
    min-width: 120px;

    &[type="submit"] {
      background: #0071e3;
      color: #ffffff;
      border-color: #0071e3;
    }

    &:hover {
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 113, 227, 0.08)"
          : "rgba(0, 113, 227, 0.15)"};

      &[type="submit"] {
        background: #0077ed;
        border-color: #0077ed;
      }
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
  }

  .form-status {
    margin-top: 24px;
    padding: 16px 20px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(52, 199, 89, 0.1)"
        : "rgba(48, 209, 88, 0.15)"};
    color: ${({ theme }) => (theme.mode === "light" ? "#248a3d" : "#30d158")};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text",
      "Helvetica Neue", sans-serif;
    border-radius: 12px;
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(52, 199, 89, 0.2)"
          : "rgba(48, 209, 88, 0.3)"};
    text-align: center;
    opacity: 0;
    animation: slideUpFadeIn 0.4s ease forwards;
  }

  @keyframes slideUpFadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
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
