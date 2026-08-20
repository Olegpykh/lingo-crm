'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import LessonBlock from './LessonBlock';
import DroppableCell from './DroppableCell';
import { initialLessons, Lesson, DAYS, TIMES } from '@/data/schedule';

export default function ScheduleGrid() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const lessonId = active.id as string;
    const [targetDay, targetTime] = (over.id as string).split('|');

    const targetOccupied = lessons.some(
      (l) => l.day === targetDay && l.time === targetTime
    );
    if (targetOccupied) return;

    setLessons((prev) =>
      prev.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, day: targetDay, time: targetTime }
          : lesson
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1000,
          margin: 'auto',
          mt: 4,
          borderRadius: 3,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: 700, color: 'text.secondary', fontSize: 12 }}
              >
                Time
              </TableCell>
              {DAYS.map((day) => (
                <TableCell
                  key={day}
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 13 }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TIMES.map((time) => (
              <TableRow key={time}>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    width: 100,
                    color: 'text.secondary',
                    fontSize: 12,
                  }}
                >
                  {time}
                </TableCell>
                {DAYS.map((day) => {
                  const cellLessons = lessons.filter(
                    (l) => l.day === day && l.time === time
                  );

                  return (
                    <DroppableCell key={`${day}-${time}`} id={`${day}|${time}`}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 1,
                          height: '100%',
                        }}
                      >
                        {cellLessons.map((lesson) => (
                          <LessonBlock key={lesson.id} lesson={lesson} />
                        ))}
                      </Box>
                    </DroppableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndContext>
  );
}
