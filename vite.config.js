// vite.config.js (CommonJS 最終穩定版)
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [react()],

  // 使用 require 導入的變數來配置 PostCSS
  css: {
    postcss: {
      plugins: [
        tailwindcss, // 這裡不再加 ()
        autoprefixer,
      ],
    },
  },
});