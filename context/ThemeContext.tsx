'use client';

import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const accentColors = {
  indigo: '#4f46e5',
  emerald: '#059669',
  rose: '#e11d48',
  amber: '#d97706',
};

type AccentKey = keyof typeof accentColors;

interface ColorModeContextType {
  mode: 'light' | 'dark';
  accent: AccentKey;
  toggleColorMode: () => void;
  setAccent: (accent: AccentKey) => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  accent: 'indigo',
  toggleColorMode: () => {},
  setAccent: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

function getInitialMode(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('lingo-mode');
  return stored === 'dark' ? 'dark' : 'light';
}

function getInitialAccent(): AccentKey {
  if (typeof window === 'undefined') return 'indigo';
  const stored = localStorage.getItem('lingo-accent');
  return stored && stored in accentColors ? (stored as AccentKey) : 'indigo';
}

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode);
  const [accent, setAccentState] = useState<AccentKey>(getInitialAccent);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('lingo-mode', next);
      return next;
    });
  };

  const setAccent = (newAccent: AccentKey) => {
    setAccentState(newAccent);
    localStorage.setItem('lingo-accent', newAccent);
  };

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
    <ColorModeContext.Provider
      value={{ mode, accent, toggleColorMode, setAccent }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
