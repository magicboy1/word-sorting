/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#56A57D',    // Mint green
        secondary: '#E17A63',  // Coral
        accent: '#1F2937',     // Navy
        highlight: '#526B96',  // Blue
        background: '#E5EDE9', // Light mint
        dark: '#4A2B2B',      // Dark brown
      },
      fontFamily: {
        sans: ['Noto Sans Arabic', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};