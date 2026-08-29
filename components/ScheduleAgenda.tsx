'use client';

import { Paper, Typography, Box, Stack, Chip } from '@mui/material';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { students } from '@/data/students';
import { levelPalette } from '@/lib/colors';

const dayOrder: Record<string, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

const dayLabels: Record<string, string> = {
  Monday: 'Montag',
  Tuesday: 'Dienstag',
  Wednesday: 'Mittwoch',
  Thursday: 'Donnerstag',
  Friday: 'Freitag',
};

export default function ScheduleAgenda() {
  const lessons = useAppStore((state) => state.lessons);

  const sorted = [...lessons].sort((a, b) => {
    const dayDiff = dayOrder[a.day] - dayOrder[b.day];
    if (dayDiff !== 0) return dayDiff;
    return a.time.localeCompare(b.time);
  });

  const grouped = sorted.reduce((acc, lesson) => {
    (acc[lesson.day] ??= []).push(lesson);
    return acc;
  }, {} as Record<string, typeof sorted>);

  const days = Object.keys(grouped).sort((a, b) => dayOrder[a] - dayOrder[b]);

  if (sorted.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">Keine Termine geplant.</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      {days.map((day) => (
        <Box key={day}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
            {dayLabels[day]}
          </Typography>
          <Paper sx={{ p: 0, overflow: 'hidden' }}>
            <Stack
              divider={
                <Box
                  sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                />
              }
            >
              {grouped[day].map((lesson) => {
                const student = students.find(
                  (s) => s.name === lesson.studentName
                );
                const colors = student ? levelPalette[student.level] : null;

                const row = (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      cursor: student ? 'pointer' : 'default',
                      transition: 'background-color 0.15s',
                      '&:hover': student
                        ? { bgcolor: 'action.hover' }
                        : undefined,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, minWidth: 56 }}
                    >
                      {lesson.time}
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {lesson.studentName}
                    </Typography>
                    {student && (
                      <Chip
                        label={student.level}
                        size="small"
                        sx={{
                          bgcolor: colors!.solid,
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ minWidth: 60, textAlign: 'right' }}
                    >
                      {lesson.duration} min
                    </Typography>
                  </Box>
                );

                return student ? (
                  <Link
                    key={lesson.id}
                    href={`/students/${student.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {row}
                  </Link>
                ) : (
                  <Box key={lesson.id}>{row}</Box>
                );
              })}
            </Stack>
          </Paper>
        </Box>
      ))}
    </Stack>
  );
}
