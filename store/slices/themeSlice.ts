import { StateCreator } from 'zustand';

export const accentColors = {
  indigo: '#4f46e5',
  emerald: '#059669',
  rose: '#e11d48',
  amber: '#d97706',
};

export type AccentKey = keyof typeof accentColors;

export interface ThemeSlice {
  mode: 'light' | 'dark';
  accent: AccentKey;
  toggleColorMode: () => void;
  setAccent: (accent: AccentKey) => void;
}

export const createThemeSlice: StateCreator<ThemeSlice> = (set) => ({
  mode: 'light',
  accent: 'indigo',
  toggleColorMode: () =>
    set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
  setAccent: (accent) => set({ accent }),
});
