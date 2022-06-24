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
        cxxl: { min: "1441px" },

      },
      extend: {
        colors: {
          darkGray: "#2E3237",
          midGray: "#707174",
          lightGray: "#A7A9AA",  
          cbg: "#26282b",
          ctitle: "#A7A9AA",
          ctext: "#707174",
          bcolor: "#2E3237",
          lgrad: "#D43C0B",
          rgrad: "#BF8A10",
        },
        boxShadow: {
          cshadow:
            "7px 7px 15px 5px rgba(0,0,0,.3), -4px -4px 5px 7px rgba(80,80,80,1)",
          cbshadow:
            "7px 7px 15px 0px rgba(0,0,0,.3), -7px -7px 15px 0px rgba(80,80,80,1), inset -1px -1px 2px 0px rgba(0,0,0,.3), inset 1px 1px 2px 0px rgba(80,80,80,1)",
          bshadow:
            "0 0 6px 6px #26282B, 12px 12px 16px 8px rgba(2, 2, 2, 0.7), -12px -12px 16px 8px rgba(27, 27, 27, 0.7)",
          btns: "7px 7px 15px 0px rgba(0,0,0,.3), -7px -7px 15px 0px rgba(80,80,80,1), inset 0px 0px 0px 0px rgba(0,0,0,0), inset 0px 0px 0px 0px rgba(80,80,80,0)",
          btna: "7px 7px 15px 0px rgba(0,0,0,.3), -7px -7px 15px 0px rgba(80,80,80,1), inset 4px 4px 8px 0px rgba(0,0,0,.3), inset -4px -4px 8px 0px rgba(80,80,80,1)",
          btnpa:
            "7px 7px 15px 0px rgba(0,0,0,.3), -7px -7px 15px 0px rgba(80,80,80,1), inset 4px 4px 20px 0px rgba(0, 0, 0, .3) ",
        },
      },
    },
    plugins: [],
  };
