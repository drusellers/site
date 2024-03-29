const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
      './components/**/*.js',
      './components/**/*.tsx',
      './app/**/*.tsx',
      './pages/**/*.tsx',
      './lib/**/*.ts'
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
      gridTemplateColumns: {
        '2cols': '1fr 2fr'
      },
      gridTemplateRows: {
        'outer': 'minmax(calc(100vh - 500px), max-content), 500px'
      }
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
