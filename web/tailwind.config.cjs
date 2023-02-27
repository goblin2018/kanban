/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eaeff9',
          100: '#bccced',
          200: '#9cb3e4',
          300: '#6f90d7',
          400: '#537bd0',
          500: '#285ac4',
          600: '#2452b2',
          700: '#1c408b',
          800: '#16326c',
          900: '#112652',
        },
        error: '#eb5757',
        text: {
          disabled: '#ababab',
        },
      },

      fontSize: {
        xs: [
          '0.75rem',
          {
            lineHeight: '1.25rem',
            fontWeight: 400,
          },
        ],
        base: [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: 400,
          },
        ],
        bold: [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: 500,
          },
        ],
        xl: [
          '1.5rem',
          {
            lineHeight: '2rem',
            fontWeight: 500,
          },
        ],
        '2xl': [
          '2.25rem',
          {
            lineHeight: '3rem',
            fontWeight: 500,
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
          }),
        },
        {
          values: Object.assign(theme('bgGradientDeg', {}), {
            10: '10deg',
            105: '105deg',
            115: '115deg',
          }),
        }
      )
    }),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
}
