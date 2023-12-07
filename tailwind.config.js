module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // or 'media' or 'class'
  plugins: [
    require('preline/plugin'),
  ],
  
  
}