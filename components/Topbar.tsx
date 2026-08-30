'use client';

import { Box, Avatar, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppStore } from '@/store/useAppStore';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAppStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = () => {
    const nextLocale = locale === 'de' ? 'en' : 'de';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        py: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <IconButton
        onClick={onMenuClick}
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      <Button
        onClick={switchLocale}
        size="small"
        sx={{ mr: 2, minWidth: 0, fontWeight: 600 }}
      >
        {locale === 'de' ? 'EN' : 'DE'}
      </Button>

      <Avatar
        src={user.avatar ?? undefined}
        onClick={() => router.push('/settings')}
        sx={{
          bgcolor: 'primary.main',
          width: 36,
          height: 36,
          cursor: 'pointer',
          transition: 'opacity 0.15s',
          '&:hover': { opacity: 0.8 },
        }}
      >
        {user.name.charAt(0)}
      </Avatar>
    </Box>
  );
}
