/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#061329',
          900: '#0b2048', // --navy-d
          DEFAULT: '#0f2a5a', // --navy
          800: '#143670',
          700: '#1e4891',
        },
        civicBlue: {
          DEFAULT: '#2f5bb7', // --blue
          dark: '#1e428c',
          light: '#4d78d4',
          50: '#f0f4fc',
          100: '#e3eaf8', // --tag
        },
        civicGreen: {
          DEFAULT: '#1a7a4a', // --green
          dark: '#135d38', // --green-d
          light: '#22c55e', // --green-l
          bright: '#34d399', // --green-bright
          50: '#edf9f2',
          100: '#d1fae5',
        },
        cream: '#fdfcf6', // --cream
        warmBg: '#f5f3ee', // --bg
        ink: '#12203a', // --ink
        warmWhite: '#fdfcf6',
        bodyDark: '#12203a',
        cardBg: '#FFFFFF',
        accentGold: '#C59A3F',
        subtleBorder: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Poppins', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Sans Telugu"', 'Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 42, 90, 0.05), 0 1px 2px -1px rgba(15, 42, 90, 0.05)',
        'elevated': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'premium': '0 12px 36px rgba(15, 42, 90, 0.12)',
        'glow-green': '0 0 45px rgba(26, 122, 74, 0.35)',
      }
    },
  },
  plugins: [],
}
