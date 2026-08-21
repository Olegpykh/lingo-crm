'use client';

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from 'react';
import { initialLessons, Lesson } from '@/data/schedule';

interface LessonsContextType {
  lessons: Lesson[];
  moveLesson: (lessonId: string, day: string, time: string) => void;
}

const LessonsContext = createContext<LessonsContextType>({
  lessons: initialLessons,
  moveLesson: () => {},
});

export const useLessons = () => useContext(LessonsContext);

function subscribe(callback: () => void) {
  window.addEventListener('lingo-lessons-change', callback);
  return () => window.removeEventListener('lingo-lessons-change', callback);
}

function getSnapshot(): string {
  return (
    localStorage.getItem('lingo-lessons') ?? JSON.stringify(initialLessons)
  );
}

function getServerSnapshot(): string {
  return JSON.stringify(initialLessons);
}

export default function LessonsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const lessons: Lesson[] = JSON.parse(raw);

  const moveLesson = (lessonId: string, day: string, time: string) => {
    const targetOccupied = lessons.some(
      (l) => l.day === day && l.time === time
    );
    if (targetOccupied) return;

    const updated = lessons.map((lesson) =>
      lesson.id === lessonId ? { ...lesson, day, time } : lesson
    );

    localStorage.setItem('lingo-lessons', JSON.stringify(updated));
    window.dispatchEvent(new Event('lingo-lessons-change'));
  };

  return (
    <LessonsContext.Provider value={{ lessons, moveLesson }}>
      {children}
    </LessonsContext.Provider>
  );
}
