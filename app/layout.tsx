'use client';

import { useState } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Box } from '@mui/material';
import AppThemeProvider from '@/components/AppThemeProvider';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppThemeProvider>
          <Box
            sx={{
              display: 'flex',
              bgcolor: 'background.default',
              minHeight: '100vh',
            }}
          >
            <Sidebar
              mobileOpen={mobileOpen}
              onClose={() => setMobileOpen(false)}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0, overflowX: 'hidden' }}>
              <Topbar onMenuClick={() => setMobileOpen((prev) => !prev)} />
              {children}
            </Box>
          </Box>
        </AppThemeProvider>
      </body>
    </html>
  );
}
