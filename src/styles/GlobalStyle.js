import { createGlobalStyle } from "styled-components"
import fonts from "./fonts"
import variables from "./variables"
import TransitionStyles from "./TransitionStyles"
import PrismStyles from "./PrismStyles"

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 113, 227, 0.2)"
        : "rgba(41, 151, 255, 0.3)"};
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--light-navy)" : "var(--white)"};
  }

  /* Provide basic, default focus styles.*/
  :focus {
    outline: 2px dashed ${({ theme }) => theme.colors[theme.mode].green};
    outline-offset: 3px;
  }

  /*
    Remove default focus styles for mouse users ONLY if
    :focus-visible is supported on this platform.
  */
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  /*
    Optionally: If :focus-visible is supported on this
    platform, provide enhanced focus styles for keyboard
    focus.
  */
  :focus-visible {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }

  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.colors[theme.mode].darkSlate} ${({
  theme,
}) => theme.colors[theme.mode].navy};
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors[theme.mode].navy};
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors[theme.mode].darkSlate};
    border: 3px solid ${({ theme }) => theme.colors[theme.mode].navy};
    border-radius: 10px;
  }

body {
  margin: 0;
  width: 100%;
  min-height: 100%;
  overflow-x: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background-color: ${({ theme }) => theme.colors[theme.mode].background};
  color: ${({ theme }) => theme.colors[theme.mode].text};
  font-family: var(--font-sans);
  font-size: var(--fz-xl);
  line-height: 1.3;
  transition: background-color 0.3s ease, color 0.3s ease;

  /* Only hide body overflow on desktop when using fixed sidebar */
  @media (min-width: 768px) {
    overflow-y: hidden;
  }

  @media (max-width: 480px) {
    font-size: var(--fz-lg);
  }

  &.hidden {
    overflow: hidden;
  }

  &.blur {
    overflow: hidden;

    header {
      background-color: transparent;
    }

    #content > * {
      filter: blur(5px) brightness(0.7);
      transition: var(--transition);
      pointer-events: none;
      user-select: none;
    }
  }
}


  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;

    /* Only apply these styles to main elements that are NOT our custom layout */
    &:not(#content) {
      min-height: 100vh;
      padding: 200px 150px;

      @media (max-width: 1080px) {
        padding: 200px 100px;
      }
      @media (max-width: 768px) {
        padding: 150px 50px;
      }
      @media (max-width: 480px) {
        padding: 125px 25px;
      }

      &.fillHeight {
        padding: 0 150px;

        @media (max-width: 1080px) {
          padding: 0 100px;
        }
        @media (max-width: 768px) {
          padding: 0 50px;
        }
        @media (max-width: 480px) {
          padding: 0 25px;
        }
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 100px 0;
    max-width: 1000px;

    @media (max-width: 768px) {
      padding: 80px 0;
    }

    @media (max-width: 480px) {
      padding: 60px 0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors[theme.mode].text};
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 80px);
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(40px, 8vw, 60px);
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 40px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--green);
      font-family: var(--font-sans);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 500;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: ${({ theme }) =>
        theme.mode === "light" ? "#d2d2d7" : "#424245"};

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);

    &:hover,
    &:focus {
      color: var(--green);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -1px;
      left: 0;
      background-color: var(--green);
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea, select {
    background-color: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255, 255, 255, 0.8)"
        : "rgba(10, 25, 47, 0.8)"};
    border: 1px solid ${({ theme }) =>
      theme.mode === "light" ? "var(--light-slate)" : "var(--navy)"};
    border-radius: 4px;
    padding: 10px;
    color: ${({ theme }) =>
      theme.mode === "light" ? "var(--dark-slate)" : "var(--lightest-slate)"};
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: var(--green);
      box-shadow: 0 0 0 1px var(--green);
    }
  }

  p {
    margin: 0 0 15px 0;
    line-height: 1.6;

    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: ${({ theme }) =>
        theme.mode === "light"
          ? "rgba(0, 0, 0, 0.06)"
          : "rgba(255, 255, 255, 0.1)"};
      color: inherit;
      font-size: var(--fz-sm);
      border-radius: var(--border-radius-sm);
      padding: 0.2em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-sm);
      li {
        position: relative;
        padding-left: 24px;
        margin-bottom: 10px;
        &:before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--green);
          font-weight: 600;
        }
      }
    }
  }

  blockquote {
    border-left: 3px solid var(--green);
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0, 113, 227, 0.03)"
        : "rgba(41, 151, 255, 0.05)"};
    border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
    padding: 1rem 1.5rem;

    p {
      font-style: normal;
      font-size: var(--fz-lg);
      color: ${({ theme }) => theme.colors[theme.mode].textSecondary};
    }
  }

  hr {
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "#d2d2d7" : "#424245"};
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 2rem 0;
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--fz-md);
  }

  .skip-to-content {
    ${({ theme }) => theme.mixins.button};
    position: absolute;
    top: auto;
    left: -999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    z-index: -99;

    &:hover,
    &:focus {
      background-color: var(--green);
      color: var(--navy);
      top: 0;
      left: 0;
      width: auto;
      height: auto;
      overflow: auto;
      z-index: 99;
      box-shadow: none;
      transform: none;
    }
  }

  #logo {
    color: var(--green);
  }

  .overline {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: var(--green);
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--fz-sm);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: var(--green);

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      font-weight: 600;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};

  /* Custom scrollbar for Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      theme.mode === "light"
        ? "var(--light-slate)"
        : "var(--dark-navy)"} transparent;
  }

  /* Custom scrollbar for Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) =>
      theme.mode === "light" ? "var(--light-slate)" : "var(--dark-navy)"};
    border-radius: 6px;
    border: 3px solid transparent;
  }
`

export default GlobalStyle
