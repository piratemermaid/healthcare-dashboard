import { createTheme } from '@mui/material/styles';

/**
 * Healthcare dashboard theme
 * Clean, calming, trustworthy palette with high-contrast for accessibility
 */
const lightPalette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
  },
  chart: {
    blue: '#1976d2',
    blueLight: '#42a5f5',
    green: '#2e7d32',
    greenLight: '#66bb6a',
    neutral: '#78909c',
    neutralLight: '#b0bec5',
    alert: '#d32f2f',
    warning: '#ed6c02',
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
