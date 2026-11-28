module.exports = {
  presets: [
    [
      "babel-preset-gatsby",
      {
        targets: { browsers: ["> 0.25%", "not dead", "not ios_saf < 12"] },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-styled-components",
  ],
}
