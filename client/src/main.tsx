import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import App from './App.tsx';
import { lightTheme } from '~/themes/light';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
      <CssBaseline />
    </ThemeProvider>
  </StrictMode>
);
