/**
 * MUI theme augmentation - extends Palette with custom chart tokens.
 */
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    chart: {
      blue: string;
      blueLight: string;
      green: string;
      greenLight: string;
      neutral: string;
      neutralLight: string;
      alert: string;
      warning: string;
    };
  }

  interface PaletteOptions {
    chart?: {
      blue?: string;
      blueLight?: string;
      green?: string;
      greenLight?: string;
      neutral?: string;
      neutralLight?: string;
      alert?: string;
      warning?: string;
    };
  }
}
