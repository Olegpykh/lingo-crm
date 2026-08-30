'use client';

import { useState } from 'react';
import {
  Typography,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewListIcon from '@mui/icons-material/ViewList';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import ScheduleAgenda from '@/components/ScheduleAgenda';

const ScheduleGrid = dynamic(() => import('@/components/ScheduleGrid'), {
  ssr: false,
});

export default function SchedulePage() {
  const t = useTranslations('schedule');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState<'week' | 'list'>(isMobile ? 'list' : 'week');

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 2,
          mb: 1,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {t('title')}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {view === 'week' ? t('subtitleWeek') : t('subtitleList')}
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, value) => value && setView(value)}
          size="small"
        >
          <ToggleButton value="week">
            <ViewWeekIcon sx={{ fontSize: 18, mr: 1 }} />
            {t('week')}
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon sx={{ fontSize: 18, mr: 1 }} />
            {t('list')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mt: 3 }}>
        {view === 'week' ? <ScheduleGrid /> : <ScheduleAgenda />}
      </Box>
    </Container>
  );
}
