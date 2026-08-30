'use client';

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
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useLocale } from 'next-intl';
import LessonBlock from './LessonBlock';
import DroppableCell from './DroppableCell';
import { DAYS, TIMES } from '@/data/schedule';
import { useAppStore } from '@/store/useAppStore';
import { translateDay } from '@/lib/weekdays';

export default function ScheduleGrid() {
  const locale = useLocale();
  const lessons = useAppStore((state) => state.lessons);
  const moveLesson = useAppStore((state) => state.moveLesson);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
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
        sx={{
          maxWidth: 1000,
          margin: 'auto',
          mt: { xs: 2, md: 4 },
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: { xs: 70, md: 100 } }}>
                Time
              </TableCell>
              {DAYS.map((day) => (
                <TableCell
                  key={day}
                  align="center"
                  sx={{ fontWeight: 'bold', width: { xs: 90, md: 150 } }}
                >
                  {translateDay(day, locale)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {TIMES.map((time) => (
              <TableRow key={time}>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 'bold', width: { xs: 70, md: 100 } }}
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
