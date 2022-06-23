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
        xl: '1440px',
        csm: { max: "767px" },
        cmd: { min: "768px" },
        clg: { min: "1024px" },
        cxl: { min: "1159px" },
      },
      extend: {
        colors: {
          darkGray: "#2E3237",
          midGray: "#707174",
          lightGray: "#A7A9AA",
          lime: {
            1000: "#eafadd",
          },
          gray: {
            1000: "#f1eafc",
          },
          pink: {
             1000: "#fee3c8",
          },
          // lightGray: "#EBECF0",
          // medGray: "#A2B1CA",
          // darkGray: "#6C7A92"
        }
      },
    },
    plugins: [],
  }
