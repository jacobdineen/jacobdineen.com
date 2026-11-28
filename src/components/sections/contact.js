import React, { useState } from "react"
import styled from "styled-components"

const StyledContactSection = styled.section`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  padding: 0;
  position: relative;
  z-index: 10;

  /* Force visibility and override ScrollReveal */
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;

  @media (min-width: 768px) {
    padding: 0;
  }

  @media (min-width: 1080px) {
    padding: 0;
  }

  .title {
    font-size: clamp(1.4rem, 4vw, 1.8rem);
    margin-bottom: 2rem;
    font-weight: 600;
    font-family: var(--font-sans);
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    letter-spacing: -0.03em;
    line-height: 1.2;
    opacity: 1;
  }

  .lede {
    margin: 0 auto 28px;
    max-width: 560px;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.6;

    a {
      color: ${({ theme }) => (theme.mode === "light" ? "#0071e3" : "#3a9bff")};
    }
  }

  .row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0 16px;
    width: 100%;

    @media (min-width: 600px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .gotcha {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
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
    margin-bottom: 1rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: var(--font-sans);
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
    transition: border-color 0.15s ease, background-color 0.15s ease;
    font-family: var(--font-sans);
    border-radius: 12px;

    &:focus {
      outline: none;
      border-color: #0071e3;
      background: ${({ theme }) =>
        theme.mode === "light" ? "#ffffff" : "#2d2d2d"};
    }

    &::placeholder {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
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
    margin-top: 8px;
    width: 100%;
    flex-wrap: wrap;

    @media (min-width: 768px) {
      gap: 16px;
    }
  }

  button {
    background: transparent;
    border: 1px solid #0071e3;
    color: ${({ theme }) => (theme.mode === "light" ? "#0071e3" : "#3a9bff")};
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 500;
    padding: 12px 24px;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
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
    font-family: var(--font-sans);
    border-radius: 12px;
    border: 1px solid
      ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(52, 199, 89, 0.2)"
          : "rgba(48, 209, 88, 0.3)"};
    text-align: center;
    opacity: 0;
    animation: slideUpFadeIn 0.4s ease forwards;

    &.error {
      background: rgba(255, 59, 48, 0.1);
      color: ${({ theme }) => (theme.mode === "light" ? "#c9341f" : "#ff6961")};
      border-color: rgba(255, 59, 48, 0.3);
    }

    a {
      color: inherit;
      text-decoration: underline;
    }
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

const ENDPOINT = "https://formspree.io/f/xkgwgjqn"
const EMPTY = { name: "", email: "", message: "" }

const Contact = () => {
  const [fields, setFields] = useState(EMPTY)
  // idle | sending | sent | error
  const [status, setStatus] = useState("idle")

  const handleChange = e => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }

  // All three fields are always in the form, so Formspree receives the
  // sender's name and email (it uses "email" as the Reply-To) along with
  // the message.
  const handleSubmit = async e => {
    e.preventDefault()
    setStatus("sending")
    const data = new FormData(e.target)
    data.append("_subject", `jacobdineen.com: message from ${fields.name}`)
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      })
      if (!res.ok) throw new Error(String(res.status))
      setFields(EMPTY)
      setStatus("sent")
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <StyledContactSection id="contact">
      <h2 className="numbered-heading">Get In Touch</h2>
      <p className="lede">
        Questions about a paper, or interested in working together? Send a note
        here or email <a href="mailto:jdineen@asu.edu">jdineen@asu.edu</a>.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>
            Name
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={fields.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          Message
          <textarea
            name="message"
            value={fields.message}
            onChange={handleChange}
            required
          />
        </label>
        {/* Honeypot: hidden from people, filled in by bots; Formspree drops those. */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="gotcha"
        />
        <div className="button-group">
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </div>
      </form>
      <div role="status" aria-live="polite">
        {status === "sent" && (
          <p className="form-status">Thanks, your message was sent.</p>
        )}
        {status === "error" && (
          <p className="form-status error">
            The message didn&apos;t go through. Please email{" "}
            <a href="mailto:jdineen@asu.edu">jdineen@asu.edu</a> instead.
          </p>
        )}
      </div>
    </StyledContactSection>
  )
}

export default Contact
