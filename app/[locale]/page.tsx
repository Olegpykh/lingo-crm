'use client';

import { Typography, Container, Stack, Paper, Box, Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import StatCard from '@/components/StatCard';
import { students } from '@/data/students';
import { useAppStore } from '@/store/useAppStore';
import { levelPalette } from '@/lib/colors';
import {
  getTotalLessons,
  getLevelCounts,
  getNewStudentsCount,
  getAvgAttendance,
  getHighAttendanceCount,
  getPendingPaymentsCount,
  getOverdueCount,
} from '@/entities/student/stats';

const dayOrder: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

const totalLessons = getTotalLessons(students);
const levelCounts = getLevelCounts(students);
const newStudentsCount = getNewStudentsCount(students);
const avgAttendance = getAvgAttendance(students);
const highAttendanceCount = getHighAttendanceCount(students);
const pendingPaymentsCount = getPendingPaymentsCount(students);
const overdueCount = getOverdueCount(students);

export default function Home() {
  const t = useTranslations('dashboard');
  const lessons = useAppStore((state) => state.lessons);

  const upcomingLessons = [...lessons]
    .sort((a, b) => {
      const dayDiff = dayOrder[a.day] - dayOrder[b.day];
      if (dayDiff !== 0) return dayDiff;
      return a.time.localeCompare(b.time);
    })
    .slice(0, 8);

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, md: 3 } }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
        {t('title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('subtitle')}
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3, flexWrap: 'wrap', gap: 2 }}
      >
        <StatCard
          label={t('studentsLabel')}
          value={students.length}
          subtitle={`+${newStudentsCount}`}
          subtitleColor={newStudentsCount > 0 ? 'success' : 'default'}
          icon={PeopleIcon}
          iconColor="#4f46e5"
          iconBg="#eef2ff"
        />
        <StatCard
          label={t('attendanceLabel')}
          value={`${avgAttendance}%`}
          subtitle={`${highAttendanceCount}/${students.length}`}
          subtitleColor={avgAttendance >= 85 ? 'success' : 'warning'}
          icon={EventAvailableIcon}
          iconColor="#059669"
          iconBg="#ecfdf5"
        />
        <StatCard
          label={t('paymentsLabel')}
          value={pendingPaymentsCount}
          subtitle={String(overdueCount)}
          subtitleColor={overdueCount > 0 ? 'error' : 'success'}
          icon={PaymentIcon}
          iconColor="#f97316"
          iconBg="#fff7ed"
        />
        <StatCard
          label={t('lessonsLabel')}
          value={totalLessons}
          subtitle={t('lessonsSubtitle')}
          icon={ScheduleIcon}
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
        />
      </Stack>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{ flexWrap: 'wrap', gap: 2 }}
      >
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
              {t('upcomingLessons')}
            </Typography>
            <Link href="/schedule" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ fontWeight: 500 }}
              >
                {t('showAll')}
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
            {t('levelDistribution')}
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
