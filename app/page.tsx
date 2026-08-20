'use client';

import { Typography, Container, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StatCard from '@/components/StatCard';
import { students } from '@/data/students';

const totalLessons = students.reduce((sum, s) => sum + s.lessonsThisWeek, 0);

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Überblick über deine Unterrichtstätigkeit
      </Typography>

      <Stack direction="row" spacing={2}>
        <StatCard
          label="Schüler:innen"
          value={students.length}
          trend={8.4}
          icon={PeopleIcon}
          iconColor="#4f46e5"
          iconBg="#eef2ff"
        />
        <StatCard
          label="Stunden diese Woche"
          value={totalLessons}
          trend={12.6}
          icon={ScheduleIcon}
          iconColor="#f97316"
          iconBg="#fff7ed"
        />
      </Stack>
    </Container>
  );
}
