import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { srConfig } from "@config"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;
  padding-top: 0;

  .title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ccd6f6;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
    color: #8892b0;
    font-size: 1rem;
    font-weight: 600;
  }

  input,
  textarea {
    padding: 0.75rem;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 2px solid #ccd6f6;
    width: 100%;
    background-color: #112240;
    color: #ccd6f6;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-bottom-color: #64ffda;
    }
  }

  textarea {
    height: 150px; /* Default height */
    width: 300px; /* Default width */
  }

  button {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 20px;
    background-color: #64ffda;
    color: #0a192f;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #52e1c8;
    }
  }

  .form-status {
    margin-top: 1rem;
    color: #64ffda;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    margin: 0 auto 50px;

    .title {
      font-size: 2rem;
    }

    form {
      padding: 1.5rem;
    }
  }
`

const useTypewriterEffect = (text, trigger, delay = 100) => {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!trigger) return

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

const Contact = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [formStatus, setFormStatus] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const namePlaceholder = useTypewriterEffect(
    "Please enter your name",
    currentStep === 1
  )
  const emailPlaceholder = useTypewriterEffect(
    "Please enter your email",
    currentStep === 2
  )
  const messagePlaceholder = useTypewriterEffect(
    "Please enter your message",
    currentStep === 3
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

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
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={namePlaceholder}
                required
              />
            </label>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={emailPlaceholder}
                required
              />
            </label>
            <button onClick={handlePrev}>Back</button>
            <button onClick={handleNext}>Next</button>
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <label>
              Message:
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={messagePlaceholder}
                required
              />
            </label>
            <button onClick={handlePrev}>Back</button>
            <button type="submit">Send Message</button>
          </div>
        )}
      </form>
      {formStatus && <p className="form-status">{formStatus}</p>}
    </StyledContactSection>
  )
}

export default Contact
