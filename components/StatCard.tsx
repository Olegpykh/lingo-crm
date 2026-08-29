'use client';

import { Paper, Box, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { statusColorMap } from '@/lib/colors';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  subtitleColor?: 'success' | 'warning' | 'error' | 'default';
  icon: SvgIconComponent;
  iconColor: string;
  iconBg: string;
}

export default function StatCard({
  label,
  value,
  subtitle,
  subtitleColor = 'default',
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) {
  return (
    <Paper sx={{ flex: 1, minWidth: { xs: 0, sm: 220 }, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 20, color: iconColor }} />
        </Box>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
        {value}
      </Typography>

      <Typography
        variant="body2"
        sx={{ color: statusColorMap[subtitleColor], mt: 1, fontWeight: 500 }}
      >
        {subtitle}
      </Typography>
    </Paper>
  );
}
