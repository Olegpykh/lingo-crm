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
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import LessonBlock from './LessonBlock';
import DroppableCell from './DroppableCell';
import { DAYS, TIMES } from '@/data/schedule';
import { useLessons } from '@/context/LessonsContext';

export default function ScheduleGrid() {
  const { lessons, moveLesson } = useLessons();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const lessonId = active.id as string;
    const [targetDay, targetTime] = (over.id as string).split('|');

    moveLesson(lessonId, targetDay, targetTime);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, margin: 'auto', mt: 4 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Time</TableCell>
              {DAYS.map((day) => (
                <TableCell key={day} align="center" sx={{ fontWeight: 'bold' }}>
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
                  sx={{ fontWeight: 'bold', width: 100 }}
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
