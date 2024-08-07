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
        sans: ['var(--font-space-g)'],
        heading: ['var(--font-humane)', 'sans-serif'],
      },
      fontSize: {
        xxs: ['0.5rem', {
          lineHeight: '0.75rem'
        }],
        md: ['1rem', {
          lineHeight: '150%'
        }]
      },
      maxWidth: {
        document: '64rem',
      },
      gridTemplateColumns: {
        '2cols': '1fr 2fr'
      },
      gridTemplateRows: {
        'outer': 'minmax(calc(100vh - 500px), max-content), 500px'
      },
      colors: {
        oxford: {
          500: '#314D65',
          100: '#E0EBE9'
        }
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
          fontFamily: config('theme.fontFamily.sans'),
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
