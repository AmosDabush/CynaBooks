import { ThemeOptions, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    playersList: Palette["primary"];
    favoritesList: Palette["primary"];
  }
  interface PaletteOptions {
    playersList: PaletteOptions["primary"];
    favoritesList: PaletteOptions["primary"];
  }
}

const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: { main: "#20ACEE" },
    secondary: { main: "#8FBC8F" },
    background: {
      default: "#e7e9e9cf",
      paper: "#fae485",
    },
    text: { primary: "#121212" },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    primary: { main: "#ffffff" },
    secondary: { main: "#41B3A3" },
    background: {
      default: "rgba(63, 65, 105, 0.75)",
      paper: "#283d6c",
    },
    text: { primary: "#e5dbd2" },
  },
};

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

export { lightTheme, darkTheme };
