import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DD5353",
    },
    secondary: {
        main: "#B73E3E",
    },
    third: {
        main: "#EDDBC0",
    },
    fourth: {
        main: "#DBC8AC",
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true,
      },
    },
  },
});

export default theme;
