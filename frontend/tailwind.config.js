module.exports = {
    content: [
       "./src/**/**.{js,ts,jsx,tsx,html}",
       "./public/**/**.{html,js}"
    ],
    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px' 
      },
      extend: {
        colors: {
          grayBack: "#2E3237",
          grayText: "#707174",
          grayTitle: "#A7A9AA",
          // lightGray: "#EBECF0",
          // medGray: "#A2B1CA",
          // darkGray: "#6C7A92"
        }
      },
    },
    plugins: [],
  }