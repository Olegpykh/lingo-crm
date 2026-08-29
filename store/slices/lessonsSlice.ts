import { StateCreator } from 'zustand';
import { initialLessons, Lesson } from '@/data/schedule';

export interface LessonsSlice {
  lessons: Lesson[];
  moveLesson: (lessonId: string, day: string, time: string) => void;
}

export const createLessonsSlice: StateCreator<LessonsSlice> = (set, get) => ({
  lessons: initialLessons,
  moveLesson: (lessonId, day, time) => {
    const occupied = get().lessons.some(
      (l) => l.day === day && l.time === time
    );
    if (occupied) return;
    set((state) => ({
      lessons: state.lessons.map((l) =>
        l.id === lessonId ? { ...l, day, time } : l
      ),
    }));
  },
});
