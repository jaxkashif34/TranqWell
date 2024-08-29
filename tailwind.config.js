// tailwind.config.js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx,css}', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        osBold: ['osBold'],
        osBoldItalic: ['osBoldItalic'],
        osExtraBold: ['osExtraBold'],
        osExtraBoldItalic: ['osExtraBoldItalic'],
        osItalic: ['osItalic'],
        osLight: ['osLight'],
        osLightItalic: ['osLightItalic'],
        osRegular: ['osRegular'],
        osSemibold: ['osSemibold'],
        osSemiboldItalic: ['osSemiboldItalic'],
      },
      colors: {
        customer: '#29CBAD',
        warning: '#FEDE33',
        manager: '#FF9D59',
        attention: '#FF3143',
        emergency: '#1DA7FF',
        alert: '#B271FF',
        councilor: '#D6CDCE',
        disabled: '#ADB3BC',
      },
    },
  },
  plugins: [],
};
