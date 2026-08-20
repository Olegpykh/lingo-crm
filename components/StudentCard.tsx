'use client';

import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Student } from '@/data/students';

const levelColors: Record<string, string> = {
  A1: '#22c55e',
  A2: '#22c55e',
  B1: '#4f46e5',
  B2: '#4f46e5',
  C1: '#f59e0b',
  C2: '#f59e0b',
};

export default function StudentCard({ student }: { student: Student }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{student.name}</Typography>
        <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            label={student.level}
            size="small"
            sx={{
              bgcolor: levelColors[student.level],
              color: 'white',
              fontWeight: 600,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {student.lessonsThisWeek} Stunden diese Woche
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
