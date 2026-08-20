'use client';

import { Box, Typography } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import { students } from '@/data/students';
import { Lesson } from '@/data/schedule';

const levelColors: Record<string, { bg: string; text: string }> = {
  A1: { bg: '#dcfce7', text: '#15803d' },
  A2: { bg: '#dcfce7', text: '#15803d' },
  B1: { bg: '#e0e7ff', text: '#4338ca' },
  B2: { bg: '#e0e7ff', text: '#4338ca' },
  C1: { bg: '#fef3c7', text: '#b45309' },
  C2: { bg: '#fef3c7', text: '#b45309' },
};

export default function LessonBlock({ lesson }: { lesson: Lesson }) {
  const student = students.find((s) => s.name === lesson.studentName);
  const colors = levelColors[student?.level ?? 'B1'];

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lesson.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
      }
    : undefined;

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        bgcolor: colors.bg,
        color: colors.text,
        borderRadius: 1.5,
        p: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 0.25,
        cursor: 'grab',
        userSelect: 'none',
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging
          ? '0 8px 24px rgba(0,0,0,0.18)'
          : '0 1px 2px rgba(0,0,0,0.04)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: 12.5 }}
      >
        {lesson.studentName}
      </Typography>
      <Typography
        variant="caption"
        sx={{ opacity: 0.75, fontSize: 10.5, fontWeight: 500 }}
      >
        {student?.level} · {lesson.duration} min
      </Typography>
    </Box>
  );
}
