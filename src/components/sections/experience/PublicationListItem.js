import styled from "styled-components"

const PublicationListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  text-align: left;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2c2b29")};
  background: transparent;
  color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
  transition: border-color 0.1s ease;
  position: relative;

  ${({ featuredAccent }) =>
    featuredAccent &&
    `
      border-left-width: 3px;
      border-left-color: #0071e3;
      padding-left: 18px;
    `}

  &:hover,
  &:focus-within {
    z-index: 20;
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#a1a1a6" : "#4a4845"};
    ${({ featuredAccent }) => featuredAccent && `border-left-color: #0071e3;`}
  }

  ${({ $featuredCard, theme }) =>
    $featuredCard &&
    `
      padding: 0 0 16px;
      overflow: hidden;
      background: ${theme.mode === "light" ? "#ffffff" : "#171615"};
      transition: border-color 0.15s ease, transform 0.2s ease,
        box-shadow 0.2s ease;

      > *:not(.thumb) {
        margin-left: 18px;
        margin-right: 18px;
      }

      .title {
        margin-top: 14px;
        font-size: 1.02rem;
        text-wrap: balance;
      }

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          transform: translateY(-2px);
          box-shadow: ${
            theme.mode === "light"
              ? "0 10px 24px -14px rgba(0, 0, 0, 0.25)"
              : "0 10px 24px -14px rgba(0, 0, 0, 0.8)"
          };
        }
      }
    `}

  .thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 150px;
    padding: 12px 14px;
    overflow: hidden;

    @media (max-width: 480px) {
      height: 130px;
    }
    background: #ffffff;
    border-bottom: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#ececf0" : "#2c2b29")};

    &:after {
      display: none;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
      transition: transform 0.35s ease;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover .thumb img {
      transform: scale(1.025);
    }
  }

  .title .preview {
    display: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .title {
      position: relative;
      z-index: 3;
    }

    .title .preview {
      display: flex;
      flex-direction: column;
      gap: 8px;
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: 30;
      width: min(380px, 80vw);
      padding: 10px 10px 12px;
      border-radius: 10px;
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#34322f")};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#ffffff" : "#1b1a19"};
      box-shadow: ${({ theme }) =>
        theme.mode === "light"
          ? "0 18px 40px -18px rgba(0, 0, 0, 0.3)"
          : "0 18px 40px -18px rgba(0, 0, 0, 0.9)"};
      font-family: var(--font-sans);
      font-variation-settings: normal;
      letter-spacing: 0;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateY(4px);
      transition: opacity 0.16s ease, transform 0.16s ease,
        visibility 0s linear 0.16s;

      img {
        width: 100%;
        height: 130px;
        object-fit: contain;
        background: #ffffff;
        border-radius: 6px;
        padding: 6px;
        display: block;
      }
    }

    .title:hover .preview {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      transition: opacity 0.18s ease 0.3s, transform 0.18s ease 0.3s,
        visibility 0s linear 0.3s;
    }

    @media (prefers-reduced-motion: reduce) {
      .title .preview,
      .title:hover .preview {
        transform: none;
      }
    }
  }

  .preview-text {
    font-size: 0.76rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${({ theme }) => (theme.mode === "light" ? "#3a3a3c" : "#c7c5c0")};
  }

  .preview-meta {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#9a9894")};
  }

  .title {
    font-family: var(--font-serif);
    font-size: 1.05rem;
    font-weight: 500;
    color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
    margin-bottom: 6px;
    line-height: 1.3;
    letter-spacing: -0.015em;
    font-variation-settings: "opsz" 96;

    a {
      color: inherit;
      text-decoration: none;

      &:after {
        display: none;
      }
    }

    a:hover {
      color: #0071e3;
    }
  }

  .authors {
    font-size: 0.8rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#9a9894")};
    margin-bottom: 10px;
    line-height: 1.5;

    .me {
      color: ${({ theme }) => (theme.mode === "light" ? "#1d1d1f" : "#f5f5f7")};
      font-weight: 500;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:after {
        display: none;
      }
    }

    a:hover {
      color: #0071e3;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.75rem;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#6e6e73")};

    .chip {
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.68rem;
      padding: 3px 8px;
      border-radius: 4px;
      background: transparent;
    }

    .chip.tier-top {
      color: ${({ theme }) => (theme.mode === "light" ? "#0058b0" : "#6cb4ff")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#b3d4f5" : "#1f4a75"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#eef5fd" : "rgba(10, 132, 255, 0.12)"};
    }

    .chip.tier-conf {
      color: ${({ theme }) => (theme.mode === "light" ? "#2f6b3a" : "#7fd08e")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#bfdcc4" : "#2b5234"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#f1f8f2" : "rgba(52, 199, 89, 0.10)"};
    }

    .chip.tier-ws {
      color: ${({ theme }) => (theme.mode === "light" ? "#8a5a00" : "#f0b85c")};
      border-color: ${({ theme }) =>
        theme.mode === "light" ? "#ecd3a4" : "#5c4520"};
      background: ${({ theme }) =>
        theme.mode === "light" ? "#fdf7ec" : "rgba(255, 159, 10, 0.10)"};
    }

    .chip.tier-pre {
      border-style: dashed;
    }

    .date {
      color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#9a9894")};
      font-family: var(--font-mono);
    }

    a.chip-link,
    button.chip-link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px;
      border-radius: 4px;
      border: 1px solid
        ${({ theme }) => (theme.mode === "light" ? "#d2d2d7" : "#2d2d2d")};
      color: ${({ theme }) => (theme.mode === "light" ? "#48484a" : "#a1a1a6")};
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.02em;
      text-decoration: none;
      transition: color 0.1s ease, border-color 0.1s ease;
      background: transparent;
      white-space: nowrap;

      svg {
        width: 11px;
        height: 11px;
        display: block;
      }

      &:hover {
        color: #0071e3;
        border-color: #0071e3;
      }

      &:after {
        display: none;
      }
    }

    button.chip-link {
      cursor: pointer;
      line-height: inherit;

      &.copied {
        color: #34a853;
        border-color: #34a853;
      }
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .tag {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    text-transform: lowercase;
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid
      ${({ theme }) => (theme.mode === "light" ? "#e5e5ea" : "#2d2d2d")};
    background: transparent;
    color: ${({ theme }) => (theme.mode === "light" ? "#6e6e73" : "#a1a1a6")};
    cursor: pointer;
    transition: color 0.1s ease, border-color 0.1s ease,
      background-color 0.1s ease;

    &:hover {
      color: #0071e3;
      border-color: #0071e3;
    }

    &.active {
      color: #ffffff;
      background: #0071e3;
      border-color: #0071e3;
    }
  }

  @media (max-width: 768px) {
    padding: 14px 16px;

    .title {
      font-size: 0.98rem;
    }

    .authors {
      font-size: 0.76rem;
    }
  }
`

export default PublicationListItem
