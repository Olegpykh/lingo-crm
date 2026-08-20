'use client';

import { Paper, Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { SvgIconComponent } from '@mui/icons-material';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: number;
  icon: SvgIconComponent;
  iconColor: string;
  iconBg: string;
}

export default function StatCard({
  label,
  value,
  trend,
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) {
  const isPositive = trend >= 0;

  return (
    <Paper sx={{ flex: 1 }}>
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
          }}
        >
          <Icon sx={{ fontSize: 20, color: iconColor }} />
        </Box>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
        {value}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
        {isPositive ? (
          <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
        ) : (
          <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
        )}
        <Typography
          variant="body2"
          sx={{
            color: isPositive ? 'success.main' : 'error.main',
            fontWeight: 600,
          }}
        >
          {isPositive ? '+' : ''}
          {trend}%
        </Typography>
      </Box>
    </Paper>
  );
}
