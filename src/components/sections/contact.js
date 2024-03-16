import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { srConfig, email } from "@config"
import sr from "@utils/sr"
import { usePrefersReducedMotion } from "@hooks"

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;
  padding-top: 0px;
  h1 {
    font-size: 0.75rem;
    font-weight: 75;
    padding-bottom: -20px;
    font-family: var(--font-mono);
    color: #ccd6f6;
    margin: 0 0 20px 0;
  }
  h2 {
    font-size: 0.5rem;
    font-weight: 75;
    font-family: var(--font-mono);
    color: #ccd6f6;
    margin: 0 0 20px 0;
  }
  @media (max-width: 768px) {
    margin: 0 auto 50px;
    padding-top: 0px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`

const Contact = () => {
  const revealContainer = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    sr.reveal(revealContainer.current, srConfig())
  }, [])

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="title">Get In Touch</h2>

      <h1>
        I am not actively seeking new positions at the moment, but my virtual
        door is always open. If you are curious about something or would simply
        like to drop a greeting, feel free to reach out. I endeavor to respond
        when possible!
      </h1>

      <a className="email-link" href={`mailto:${email}`}>
        Email me
      </a>
    </StyledContactSection>
  )
}

export default Contact
