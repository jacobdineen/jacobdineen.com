import { css } from "styled-components"

/* Apple-style primary button - filled with accent color */
const button = css`
  color: #ffffff;
  background-color: var(--green);
  border: none;
  border-radius: 980px; /* Apple's pill-shaped buttons */
  font-size: var(--fz-sm);
  font-family: var(--font-sans);
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  padding: 1rem 1.75rem;
  transition: var(--transition);

  &:hover,
  &:focus-visible {
    outline: none;
    background-color: #0077ed;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(0.98);
  }
  &:after {
    display: none !important;
  }
`

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    position: relative;
    color: var(--green);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      color: var(--green);
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: var(--green) !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: "";
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: var(--green);
      opacity: 0.5;
      @media (prefers-reduced-motion: no-preference) {
        transition: var(--transition);
      }
    }
  `,

  button,

  /* Apple-style secondary/outline button */
  smallButton: css`
    color: var(--green);
    background-color: transparent;
    border: 1px solid var(--green);
    border-radius: 980px;
    padding: 0.6rem 1.25rem;
    font-size: var(--fz-xs);
    font-family: var(--font-sans);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: var(--green);
      color: #ffffff;
    }
    &:active {
      transform: scale(0.98);
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: #ffffff;
    background-color: var(--green);
    border: none;
    border-radius: 980px;
    padding: 1.25rem 2rem;
    font-size: var(--fz-md);
    font-family: var(--font-sans);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: #0077ed;
      transform: scale(1.02);
    }
    &:active {
      transform: scale(0.98);
    }
    &:after {
      display: none !important;
    }
  `,

  /* Apple-style subtle shadow */
  boxShadow: css`
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: var(--transition);

    &:hover,
    &:focus-visible {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    li {
      position: relative;
      padding-left: 24px;
      margin-bottom: 10px;
      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: var(--green);
        font-weight: 600;
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
}

export default mixins
