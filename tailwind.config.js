/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- 確保 Tailwind 掃描所有 React 檔案
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}