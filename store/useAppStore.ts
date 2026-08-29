'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeSlice, createThemeSlice } from './slices/themeSlice';
import { UserSlice, createUserSlice } from './slices/userSlice';
import { LessonsSlice, createLessonsSlice } from './slices/lessonsSlice';

export type AppState = ThemeSlice & UserSlice & LessonsSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createUserSlice(...args),
      ...createLessonsSlice(...args),
    }),
    { name: 'lingo-storage' }
  )
);

export { accentColors } from './slices/themeSlice';
export type { AccentKey } from './slices/themeSlice';
export type { User } from './slices/userSlice';
