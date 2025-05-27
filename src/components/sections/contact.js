import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
// import { usePrefersReducedMotion } from "@hooks"

const StyledContactSection = styled.section`
  max-width: 800px;
  margin: 0 auto 100px;
  text-align: center;
  padding: 100px 40px;
  position: relative;
  z-index: 10;
  background-color: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(17, 34, 64, 0.8)"};
  border-radius: 10px;
  border: 2px solid
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(137, 207, 239, 0.3)"
        : "rgba(137, 207, 239, 0.2)"};
  box-shadow: 0 10px 30px -15px ${({ theme }) => (theme.mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(2, 12, 27, 0.7)")};

  /* Force visibility and override ScrollReveal */
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;

  .title {
    font-size: clamp(1.5rem, 3vw, 1.8rem);
    margin-bottom: 3rem;
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--dark-navy)" : "var(--lightest-slate)"};
    opacity: 1;
    font-family: var(--font-mono);
    font-weight: 600;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 0;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    margin-bottom: 2.5rem;
    color: var(--slate);
    font-size: 0.85rem;
    font-family: var(--font-mono);
  }

  input,
  textarea {
    width: 100%;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(10, 25, 47, 0.5)"};
    border: none;
    border-bottom: 2px solid
      ${({ theme }) =>
        theme.mode === "light" ? "var(--slate)" : "var(--slate)"};
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--dark-navy)" : "var(--lightest-slate)"};
    font-size: 1.2rem;
    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    text-align: center;
    transition: all 0.3s ease;
    font-family: var(--font-mono);
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: var(--green);
      background: ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(255, 255, 255, 1)"
          : "rgba(10, 25, 47, 0.8)"};
      box-shadow: 0 0 0 1px var(--green);
    }

    &::placeholder {
      color: ${({ theme }) =>
        theme.mode === "light" ? "var(--slate)" : "var(--slate)"};
      opacity: 0.7;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    &:focus::placeholder {
      opacity: 0.3;
      transform: translateY(-10px);
    }
  }

  textarea {
    min-height: 120px;
    resize: none;
    line-height: 1.5;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    width: 100%;
  }

  button {
    background: ${({ theme }) =>
      theme.mode === "light" ? "transparent" : "transparent"};
    border: 1px solid var(--green);
    color: var(--green);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    position: relative;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    opacity: 1;
    border-radius: 4px;
    font-weight: 500;

    &:hover {
      background: var(--green-tint);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(137, 207, 239, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .form-status {
    margin-top: 2rem;
    color: var(--green);
    font-size: 0.85rem;
    font-family: var(--font-mono);
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    margin: 0 auto 50px;
    padding: 0 20px;
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
