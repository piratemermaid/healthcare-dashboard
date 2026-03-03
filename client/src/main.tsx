import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from '@tanstack/react-router';

import { router } from './router';
import { lightTheme } from '~/themes/light';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  </StrictMode>
);
