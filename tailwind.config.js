const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      'page': '50vh'
    },
    extend: {
      fontFamily: {
        heading: ["Nunito", 'sans-serif'],
        copy: ['"Open Sans"'],
      },
      maxWidth: {
        document: "64rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, config }) {
      addBase({
        a: {
          color: config("theme.colors.blue.500"),
          fontFamily: config("theme.fontFamily.copy"),
        },
        p: { fontFamily: config("theme.fontFamily.copy") },
        h1: { fontFamily: config("theme.fontFamily.heading") },
        h2: { fontFamily: config("theme.fontFamily.heading") },
        h3: { fontFamily: config("theme.fontFamily.heading") },
        h4: { fontFamily: config("theme.fontFamily.heading") },
        h5: { fontFamily: config("theme.fontFamily.heading") },
        h6: { fontFamily: config("theme.fontFamily.heading") },
      });
    }),
  ],
};
