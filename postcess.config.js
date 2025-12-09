// postcss.config.js (最兼容的 CommonJS 格式)
module.exports = {
  plugins: {
    tailwindcss: {}, // 使用降級版本，這個配置應該可以順利通過
    autoprefixer: {},
  },
};