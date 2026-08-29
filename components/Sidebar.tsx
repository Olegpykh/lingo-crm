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

export const drawerWidth = 240;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/' },
  { label: 'Schüler:innen', icon: <PeopleIcon />, href: '/students' },
  { label: 'Termine', icon: <EventIcon />, href: '/schedule' },
  { label: 'Einstellungen', icon: <SettingsIcon />, href: '/settings' },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
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
            onClick={onNavigate}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>

      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          height: '100vh',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <SidebarContent />
      </Box>
    </Box>
  );
}
