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
    background-color: #0a192f;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
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
    border: 1px solid #ccd6f6;
    border-radius: 5px;
    width: 100%;
    background-color: #112240;
    color: #ccd6f6;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #64ffda;
    }
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
const Contact = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [formStatus, setFormStatus] = useState("")

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [prefersReducedMotion])

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const response = await fetch(process.env.REACT_APP_FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
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
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Message:
          <textarea name="message" rows="5" required />
        </label>
        <button type="submit">Send Message</button>
      </form>
      {formStatus && <p className="form-status">{formStatus}</p>}
    </StyledContactSection>
  )
}

export default Contact
