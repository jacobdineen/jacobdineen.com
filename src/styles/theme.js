import mixins from './mixins';

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  link: "#89cfef",
  hover: "#64ffda",
  mixins,
};

const darkTheme = {
  background: "#000000",
  text: "#ffffff",
  link: "#89cfef",
  hover: "#64ffda",
  mixins,
};

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
};

export default theme;
