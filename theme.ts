'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      light: '#818cf8',
      dark: '#3730a3',
    },
    secondary: {
      main: '#f97316',
      light: '#fdba74',
      dark: '#c2410c',
    },
    background: {
      default: '#f8f9fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e1b2e',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h3: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          height: '100%',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
  },
});
