const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
      './components/**/*.js',
      './components/**/*.tsx',
      './app/**/*.tsx',
      './pages/**/*.tsx'
  ],
  theme: {
    minHeight: {
      page: '50vh',
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-nunito)', 'sans-serif'],
        copy: ['var(--font-open-sans)'],
      },
      maxWidth: {
        document: '64rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, config }) {
      addBase({
        a: {
          color: config('theme.colors.blue.500'),
          fontFamily: config('theme.fontFamily.copy'),
        },
        p: { fontFamily: config('theme.fontFamily.copy') },
        h1: { fontFamily: config('theme.fontFamily.heading') },
        h2: { fontFamily: config('theme.fontFamily.heading') },
        h3: { fontFamily: config('theme.fontFamily.heading') },
        h4: { fontFamily: config('theme.fontFamily.heading') },
        h5: { fontFamily: config('theme.fontFamily.heading') },
        h6: { fontFamily: config('theme.fontFamily.heading') },
      })
    }),
  ],
}
