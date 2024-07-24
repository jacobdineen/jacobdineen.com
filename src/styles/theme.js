// src/styles/theme.js
import mixins from './mixins';

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
    light: {
      background: '#ffffff',
      text: '#000000',
      footerBackground: '#f8f9fa',
      footerText: '#343a40',
    },
    dark: {
      background: '#000000',
      text: '#ffffff',
      footerBackground: '#343a40',
      footerText: '#f8f9fa',
    },
  },
};

export default theme;
