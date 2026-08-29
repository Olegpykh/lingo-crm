'use client';

import { useRouter } from 'next/navigation';
import { Box, Avatar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppStore } from '@/store/useAppStore';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const user = useAppStore((state) => state.user);
  const router = useRouter();

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
