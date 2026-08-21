'use client';

import { useState } from 'react';
import {
  Typography,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from '@mui/material';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewListIcon from '@mui/icons-material/ViewList';
import dynamic from 'next/dynamic';
import ScheduleAgenda from '@/components/ScheduleAgenda';

const ScheduleGrid = dynamic(() => import('@/components/ScheduleGrid'), {
  ssr: false,
});

export default function SchedulePage() {
  const [view, setView] = useState<'week' | 'list'>('week');

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
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
            Termine
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {view === 'week'
              ? 'Dein Unterrichtsplan für diese Woche'
              : 'Alle Termine in der Übersicht'}
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
            Woche
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon sx={{ fontSize: 18, mr: 1 }} />
            Liste
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ mt: 3 }}>
        {view === 'week' ? <ScheduleGrid /> : <ScheduleAgenda />}
      </Box>
    </Container>
  );
}
