'use client';

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  LinearProgress,
} from '@mui/material';
import { Student } from '@/data/students';
import Link from 'next/link';
import { levelPalette, paymentColors } from '@/lib/colors';

export default function StudentCard({ student }: { student: Student }) {
  return (
    <Link
      href={`/students/${student.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'box-shadow 0.15s',
          '&:hover': { boxShadow: 4 },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant="h6">{student.name}</Typography>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: paymentColors[student.paymentStatus],
                mt: 1,
              }}
              title={student.paymentStatus}
            />
          </Box>

          <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
              label={student.level}
              size="small"
              sx={{
                bgcolor: levelPalette[student.level].solid,
                color: 'white',
                fontWeight: 600,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {student.lessonsThisWeek} Stunden diese Woche
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1.5, display: 'block' }}
          >
            {student.goal}
          </Typography>

          <Box sx={{ mt: 1.5 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}
            >
              <Typography variant="caption" color="text.secondary">
                Fortschritt
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {student.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={student.progress}
              sx={{
                height: 6,
                borderRadius: 1,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': {
                  bgcolor: levelPalette[student.level].solid,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}
