/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          dark: 'var(--color-dark)',
        },
        fontFamily: {
          montserrat: ['var(--font-montserrat)', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  