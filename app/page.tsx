'use client';

import { Typography, Container, Stack, Paper, Box, Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';
import Link from 'next/link';
import StatCard from '@/components/StatCard';
import { students } from '@/data/students';
import { useLessons } from '@/context/LessonsContext';
import { levelPalette } from '@/lib/colors';

const totalLessons = students.reduce((sum, s) => sum + s.lessonsThisWeek, 0);

const levelCounts = students.reduce((acc, s) => {
  acc[s.level] = (acc[s.level] ?? 0) + 1;
  return acc;
}, {} as Record<string, number>);

const dayOrder: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

const today = new Date('2026-08-21');

function daysSince(dateStr: string): number {
  const diff = today.getTime() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const newStudentsCount = students.filter(
  (s) => daysSince(s.joinedDate) <= 30
).length;

const avgAttendance = Math.round(
  students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length
);
const highAttendanceCount = students.filter(
  (s) => s.attendanceRate >= 90
).length;

const pendingPaymentsCount = students.filter(
  (s) => s.paymentStatus !== 'Bezahlt'
).length;
const overdueCount = students.filter(
  (s) => s.paymentStatus === 'Überfällig'
).length;

export default function Home() {
  const { lessons } = useLessons();

  const upcomingLessons = [...lessons]
    .sort((a, b) => {
      const dayDiff = dayOrder[a.day] - dayOrder[b.day];
      if (dayDiff !== 0) return dayDiff;
      return a.time.localeCompare(b.time);
    })
    .slice(0, 8);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Überblick über deine Unterrichtstätigkeit
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3, flexWrap: 'wrap', gap: 2 }}
      >
        <StatCard
          label="Schüler:innen"
          value={students.length}
          subtitle={`${newStudentsCount} neu in den letzten 30 Tagen`}
          subtitleColor={newStudentsCount > 0 ? 'success' : 'default'}
          icon={PeopleIcon}
          iconColor="#4f46e5"
          iconBg="#eef2ff"
        />
        <StatCard
          label="Ø Anwesenheit"
          value={`${avgAttendance}%`}
          subtitle={`${highAttendanceCount} von ${students.length} über 90%`}
          subtitleColor={avgAttendance >= 85 ? 'success' : 'warning'}
          icon={EventAvailableIcon}
          iconColor="#059669"
          iconBg="#ecfdf5"
        />
        <StatCard
          label="Zahlungen ausstehend"
          value={pendingPaymentsCount}
          subtitle={
            overdueCount > 0 ? `${overdueCount} überfällig` : 'Keine überfällig'
          }
          subtitleColor={overdueCount > 0 ? 'error' : 'success'}
          icon={PaymentIcon}
          iconColor="#f97316"
          iconBg="#fff7ed"
        />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
        <Paper sx={{ flex: 2, minWidth: 300 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Nächste Termine
            </Typography>
            <Link href="/schedule" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                Alle anzeigen
              </Typography>
            </Link>
          </Box>
          <Stack spacing={1.5}>
            {upcomingLessons.map((lesson) => {
              const student = students.find(
                (s) => s.name === lesson.studentName
              );

              return (
                <Box
                  key={lesson.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {student ? (
                    <Link
                      href={`/students/${student.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {lesson.studentName}
                      </Typography>
                    </Link>
                  ) : (
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {lesson.studentName}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {lesson.day}, {lesson.time}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Paper>

        <Paper sx={{ flex: 1, minWidth: 240 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Niveauverteilung
          </Typography>
          <Stack spacing={1.5}>
            {Object.entries(levelCounts).map(([level, count]) => (
              <Box
                key={level}
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
              >
                <Chip
                  label={level}
                  size="small"
                  sx={{
                    bgcolor: levelPalette[level].solid,
                    color: 'white',
                    fontWeight: 600,
                    minWidth: 44,
                  }}
                />
                <Box
                  sx={{
                    flex: 1,
                    height: 8,
                    bgcolor: 'action.hover',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      width: `${(count / students.length) * 100}%`,
                      height: '100%',
                      bgcolor: levelPalette[level].solid,
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ minWidth: 24 }}
                >
                  {count}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
