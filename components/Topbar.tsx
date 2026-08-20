'use client';

import { Box, Avatar } from '@mui/material';
import { useUser } from '@/context/UserContext';

export default function Topbar() {
  const { user } = useUser();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: 4,
        py: 2,
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
        {user.name.charAt(0)}
      </Avatar>
    </Box>
  );
}
