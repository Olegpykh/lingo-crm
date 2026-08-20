'use client';

import { Typography, Container } from '@mui/material';
import dynamic from 'next/dynamic';

const ScheduleGrid = dynamic(() => import('@/components/ScheduleGrid'), {
  ssr: false,
});

export default function SchedulePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Termine
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Dein Unterrichtsplan für diese Woche
      </Typography>

      <ScheduleGrid />
    </Container>
  );
}
