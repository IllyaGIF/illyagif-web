export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideDownOpen: {
          '0%':   { opacity: 0, filter: 'blur(10px)', transform: 'scale(0.95)' },
          '100%': { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)'     },
        },
        slideDownClose: {
          '0%':   { opacity: 0, filter: 'blur(10px)', transform: 'scale(0.95)' },
          '100%': { opacity: 1, filter: 'blur(0px)', transform: 'scale(1)'     },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      animation: {
        slideDownOpen: 'slideDownOpen 0.3s ease-out forwards',
        slideDownClose: 'slideDownClose 0.3s ease-out forwards',
        'gradient-x': 'gradient-x 60s ease infinite',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
}