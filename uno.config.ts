import { defineConfig, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind3 from '@unocss/preset-wind3'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  preflights: [
    {
      getCSS: () => `
        body {
          font-family: "TikTok Sans", ui-sans-serif, system-ui, sans-serif !important;
          margin: 0;
          padding: 0;
        }

        h1, h2, h3, h4, h5, h6, p {
          margin: 0;
          padding: 0;
        }

        button {
          border: none !important;
          background: none !important;
        }

        a {
          text-decoration: none !important;
          color: inherit !important;
        }

        ul, ol {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        blockquote, hr {
          margin: 0;
          padding: 0;
        }
      `
    }
  ],
  safelist: ['prose', 'mx-auto', 'container'],
  theme: {
    colors: {
      primary: '#0ea5e9',
    },
    fontFamily: {
      sans: ['"TikTok Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  },
  shortcuts: {},
})