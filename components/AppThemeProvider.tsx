'use client';

import { useMemo, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useAppStore, accentColors } from '@/store/useAppStore';

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const mode = useAppStore((state) => state.mode);
  const accent = useAppStore((state) => state.accent);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: accentColors[accent] },
          secondary: { main: '#f97316' },
          background: {
            default: mode === 'light' ? '#f8f9fc' : '#0f1117',
            paper: mode === 'light' ? '#ffffff' : '#1a1d29',
          },
          text: {
            primary: mode === 'light' ? '#1e1b2e' : '#e5e7eb',
            secondary: mode === 'light' ? '#6b7280' : '#9ca3af',
          },
        },
        typography: {
          fontFamily: 'Inter, system-ui, sans-serif',
          h3: { fontWeight: 700 },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                height: '100%',
                boxShadow:
                  mode === 'light'
                    ? '0 1px 3px rgba(0,0,0,0.06)'
                    : '0 1px 3px rgba(0,0,0,0.4)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: { root: { padding: 16 } },
          },
        },
      }),
    [mode, accent]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
