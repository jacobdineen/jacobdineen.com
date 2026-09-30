// src/styles/theme.js
import mixins from "./mixins"

const theme = {
  bp: {
    mobileS: `max-width: 330px`,
    mobileM: `max-width: 400px`,
    mobileL: `max-width: 480px`,
    tabletS: `max-width: 600px`,
    tabletL: `max-width: 768px`,
    desktopXS: `max-width: 900px`,
    desktopS: `max-width: 1080px`,
    desktopM: `max-width: 1200px`,
    desktopL: `max-width: 1400px`,
  },
  mixins,
  colors: {
    /* Apple-inspired light mode - clean whites with subtle grays */
    light: {
      background: "#ffffff",
      backgroundSecondary: "#f5f5f7",
      text: "#1d1d1f",
      textSecondary: "#6e6e73",
      footerBackground: "#f5f5f7",
      footerText: "#6e6e73",
      border: "#d2d2d7",
      accent: "#0071e3",
      accentHover: "#0077ed",
      card: "#ffffff",
      cardHover: "#fbfbfd",
    },
    /* Apple-inspired dark mode - deep blacks with refined grays */
    dark: {
      background: "#11100f",
      backgroundSecondary: "#1b1a19",
      text: "#f5f5f7",
      textSecondary: "#a8a6a1",
      footerBackground: "#1b1a19",
      footerText: "#a8a6a1",
      border: "#3a3835",
      accent: "#2997ff",
      accentHover: "#0071e3",
      card: "#171615",
      cardHover: "#1f1e1c",
    },
  },
}

export default theme
