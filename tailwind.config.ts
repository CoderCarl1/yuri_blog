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
        DEFAULT: 'hsl(var(--color-primary) / <alpha-value>)',
        text: 'hsl(var(--color-primary-text) / <alpha-value>)',
        hover: 'hsl(var(--color-primary-hover) / <alpha-value>)',
        active: 'hsl(var(--color-primary-active) / <alpha-value>)',
      },
      secondary: {
        DEFAULT: 'hsl(var(--color-secondary) / <alpha-value>)',
        text: 'hsl(var(--color-secondary-text) / <alpha-value>)',
        hover: 'hsl(var(--color-secondary-hover) / <alpha-value>)',
        active: 'hsl(var(--color-secondary-active) / <alpha-value>)',
      },
      accent: {
        DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
        text: 'hsl(var(--color-accent-text) / <alpha-value>)',
        hover: 'hsl(var(--color-accent-hover) / <alpha-value>)',
        active: 'hsl(var(--color-accent-active) / <alpha-value>)',
      },
      grayscale: {
        light: 'hsl(var(--color-grayscale-light) / <alpha-value>)',
        DEFAULT: 'hsl(0 0% 15%)',
        dark: 'hsl(var(--color-grayscale-dark) / <alpha-value>)',
      },
      transparent: {
        DEFAULT: 'hsl(0 0% 100% / 0)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
