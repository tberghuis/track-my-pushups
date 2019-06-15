import React from "react";
import { ThemeProvider } from "react-native-elements";

const theme = {};

// should i be passing props
export default (withThemeProvider = App => () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
));

// i don't think i need for now
// export default (withThemeProvider = App => props => (
//   <ThemeProvider theme={theme}>
//     <App {...props}/>
//   </ThemeProvider>
// ));
