/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff5f3',
          100: '#ffe4e0',
          200: '#ffccc6',
          300: '#ffa399',
          400: '#ff6b5c',
          500: '#cf1b1b',
          600: '#b81212',
          700: '#900d0d',
          800: '#750b0b',
          900: '#410001',
        },
        pulse: {
          red: '#cf1b1b',
          garnet: '#900d0d',
          peach: '#ffdbc5',
          coral: '#fff0e8',
          cream: '#fff8f4',
          canvas: '#fbf9f8',
          paper: '#ffffff',
          dark: '#262626',
          darker: '#1f1f1f',
          surface: '#f7f4f2',
          ink: '#1b1c1c',
          muted: '#666666',
        },
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(207, 27, 27, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)',
        'warm-md': '0 8px 24px rgba(207, 27, 27, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
        'warm-lg': '0 16px 40px rgba(207, 27, 27, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'float': '0 20px 48px -10px rgba(207, 27, 27, 0.18)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'orbit': 'spin 30s linear infinite',
        'orbit-reverse': 'spin-reverse 40s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};
