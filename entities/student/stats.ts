import { Student } from './types';

const today = new Date('2026-08-21');


function daysSince(dateStr: string): number {
  const diff = today.getTime() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getTotalLessons(students: Student[]): number {
  return students.reduce((sum, s) => sum + s.lessonsThisWeek, 0);
}

export function getLevelCounts(students: Student[]): Record<string, number> {
  return students.reduce((acc, s) => {
    acc[s.level] = (acc[s.level] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function getNewStudentsCount(students: Student[]): number {
  return students.filter((s) => daysSince(s.joinedDate) <= 30).length;
}

export function getAvgAttendance(students: Student[]): number {
  return Math.round(
    students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length
  );
}

export function getHighAttendanceCount(students: Student[]): number {
  return students.filter((s) => s.attendanceRate >= 90).length;
}

export function getPendingPaymentsCount(students: Student[]): number {
  return students.filter((s) => s.paymentStatus !== 'Bezahlt').length;
}

export function getOverdueCount(students: Student[]): number {
  return students.filter((s) => s.paymentStatus === 'Überfällig').length;
}
