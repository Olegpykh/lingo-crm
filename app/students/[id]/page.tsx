'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Avatar,
  Stack,
  Button,
  Grid,
  LinearProgress,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Link from 'next/link';
import { students } from '@/data/students';
import { useAppStore } from '@/store/useAppStore';
import { levelPalette, paymentColors } from '@/lib/colors';

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const student = students.find((s) => s.id === id);
  const lessons = useAppStore((state) => state.lessons);

  if (!student) {
    notFound();
  }

  const studentLessons = lessons.filter((l) => l.studentName === student.name);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Button
        component={Link}
        href="/students"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Zurück zu Schüler:innen
      </Button>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
                fontSize: 24,
              }}
            >
              {student.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {student.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  mt: 0.5,
                  flexWrap: 'wrap',
                }}
              >
                <Chip
                  label={student.level}
                  size="small"
                  sx={{
                    bgcolor: levelPalette[student.level].solid,
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={student.paymentStatus}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: paymentColors[student.paymentStatus],
                    color: paymentColors[student.paymentStatus],
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={student.lessonFormat}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
            }}
          >
            <LocalFireDepartmentIcon
              sx={{
                fontSize: 20,
                color: student.streak > 0 ? '#f97316' : 'text.disabled',
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {student.streak} Serie
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <EmailIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2">{student.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant="body2">{student.phone}</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarTodayIcon
                sx={{ fontSize: 18, color: 'text.secondary' }}
              />
              <Typography variant="body2">
                Dabei seit {student.joinedDate}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Bevorzugte Zeit: {student.preferredTime} · {student.hourlyRate}
              €/Std.
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {student.progress}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Fortschritt
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {student.attendanceRate}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Anwesenheit
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {student.lessonsThisWeek}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Std. diese Woche
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {student.streak}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Serie
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
          Lernziel
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {student.goal}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={student.progress}
          sx={{
            height: 8,
            borderRadius: 1,
            bgcolor: 'action.hover',
            '& .MuiLinearProgress-bar': {
              bgcolor: levelPalette[student.level].solid,
            },
          }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Notizen
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {student.notes}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Termine
        </Typography>

        {studentLessons.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Keine Termine geplant.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            {studentLessons.map((lesson) => (
              <Box
                key={lesson.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2">
                  {lesson.day}, {lesson.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lesson.duration} min
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}
