/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      dropShadow: {
        'around-md': '0 0px 5px rgba(0,0,0,0.15)'
      }
    },
  },
  plugins: [],
}
