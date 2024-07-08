import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        400: 'hsl(var(--color-primary) / <alpha-value>)'
      },
      secondary: {
        400: 'hsl(var(--color-secondary) / <alpha-value>)'
      },
      accent: {
        400: 'hsl(var(--color-accent) / <alpha-value>)'
      },
      grayscale: {
        'primary': 'hsl(var(--grayscale-primary) / <alpha-value>)',
        'secondary': 'hsl(var(--grayscale-secondary) / <alpha-value>)'
      }
    },
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
