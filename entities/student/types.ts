export interface Student {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  lessonsThisWeek: number;
  email: string;
  phone: string;
  joinedDate: string;
  progress: number;
  goal: string;
  notes: string;
  attendanceRate: number;
  lessonFormat: 'Online' | 'Vor Ort' | 'Hybrid';
  paymentStatus: 'Bezahlt' | 'Ausstehend' | 'Überfällig';
  preferredTime: 'Morgens' | 'Nachmittags' | 'Abends';
  hourlyRate: number;
  streak: number;
  lastLessonDate: string;
}
