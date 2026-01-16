/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        baselink: {
          primary: '#0EA5E9', // Sky blue (Baselink AI brand)
          secondary: '#0284C7', // Deep sky blue
          accent: '#06B6D4', // Cyan accent
          dark: '#0F172A', // Slate 900
          light: '#F8FAFC', // Slate 50
          success: '#10B981', // Green (for CTA buttons)
          'baseball-field': '#22C55E', // Green (baseball field)
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Hiragino Kaku Gothic ProN',
          'Hiragino Sans',
          'Yu Gothic',
          'Meiryo',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

