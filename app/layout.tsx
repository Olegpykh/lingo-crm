'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Box } from '@mui/material';
import ThemeContextProvider from '@/context/ThemeContext';
import UserContextProvider from '@/context/UserContext';
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
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeContextProvider>
          <UserContextProvider>
            <Box
              sx={{
                display: 'flex',
                bgcolor: 'background.default',
                minHeight: '100vh',
              }}
            >
              <Sidebar />
              <Box sx={{ flexGrow: 1 }}>
                <Topbar />
                {children}
              </Box>
            </Box>
          </UserContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
