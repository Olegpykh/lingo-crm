'use client';

import { useState, ReactNode } from 'react';
import { Box } from '@mui/material';
import AppThemeProvider from '@/components/AppThemeProvider';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppThemeProvider>
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <Box sx={{ flexGrow: 1, minWidth: 0, overflowX: 'hidden' }}>
          <Topbar onMenuClick={() => setMobileOpen((prev) => !prev)} />
          {children}
        </Box>
      </Box>
    </AppThemeProvider>
  );
}
