/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './theme.config.tsx',
  ],
  theme: {
    boxShadow: {
      medium:
        '0 0 #0000, 0 0 #0000, 0px 0px 15px 0px rgba(0, 0, 0, 0.03), 0px 2px 30px 0px rgba(0, 0, 0, 0.08),0px 0px 1px 0px rgba(0, 0, 0, 0.3)',
    },
  },
  plugins: [],
}
