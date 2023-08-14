/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        color: {
          primary: 'var(--primary)',
          'primary-shade': 'var(--primary-shade)',
        },
        dark: {
          primary: 'var(--dark-primary)',
          'primary-shade': 'var(--dark-primary-shade)',
        },
        light: {
          primary: 'var(--light-primary)',
        },
        text: {
          black: '#000',
          white: '#fff',
        },
      },
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  plugins: [require('flowbite/plugin')],
};
