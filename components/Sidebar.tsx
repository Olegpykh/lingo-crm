'use client';

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/' },
  { label: 'Schüler:innen', icon: <PeopleIcon />, href: '/students' },
  { label: 'Termine', icon: <EventIcon />, href: '/schedule' },
  { label: 'Einstellungen', icon: <SettingsIcon />, href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          bgcolor: 'background.paper',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 3, py: 3 }}>
        <SchoolIcon sx={{ color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Lingo CRM
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 2 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            href={item.href}
            selected={pathname === item.href}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
