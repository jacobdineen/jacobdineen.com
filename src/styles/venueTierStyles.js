import { css } from "styled-components"

// Colors for venue chips by tier (see utils/venueTier). Apply to the chip
// element itself: `.venue { ${venueTierStyles} }`.
const venueTierStyles = css`
  &.tier-top {
    color: ${({ theme }) => (theme.mode === "light" ? "#0058b0" : "#6cb4ff")};
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#b3d4f5" : "#1f4a75"};
    background: ${({ theme }) =>
      theme.mode === "light" ? "#eef5fd" : "rgba(10, 132, 255, 0.12)"};
  }

  &.tier-conf {
    color: ${({ theme }) => (theme.mode === "light" ? "#2f6b3a" : "#7fd08e")};
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#bfdcc4" : "#2b5234"};
    background: ${({ theme }) =>
      theme.mode === "light" ? "#f1f8f2" : "rgba(52, 199, 89, 0.10)"};
  }

  &.tier-ws {
    color: ${({ theme }) => (theme.mode === "light" ? "#8a5a00" : "#f0b85c")};
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "#ecd3a4" : "#5c4520"};
    background: ${({ theme }) =>
      theme.mode === "light" ? "#fdf7ec" : "rgba(255, 159, 10, 0.10)"};
  }

  &.tier-pre {
    border-style: dashed;
  }
`

export default venueTierStyles
