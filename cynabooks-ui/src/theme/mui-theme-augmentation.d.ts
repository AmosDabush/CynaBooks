import { createTheme, ThemeOptions } from "@mui/material/styles";
import {
  PaletteColorOptions,
  PaletteTonalOffset,
  TypeBackground,
} from "@mui/material/styles/createPalette";
import { PaletteMode } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    card?: { [key: string]: string };
    card?: { [key: string]: string };
  }

  interface PaletteOptions {
    background?: TypeBackground;
  }


}
