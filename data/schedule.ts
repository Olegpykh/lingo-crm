export interface Lesson {
  id: string;
  studentName: string;
  day: string;
  time: string;
  duration: number;
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TIMES = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
];

export const initialLessons: Lesson[] = [
  {
    id: '1',
    studentName: 'Anna Müller',
    day: 'Monday',
    time: '14:00',
    duration: 60,
  },
  {
    id: '2',
    studentName: 'Tom Fischer',
    day: 'Monday',
    time: '16:00',
    duration: 45,
  },
  {
    id: '3',
    studentName: 'Lea Schmidt',
    day: 'Tuesday',
    time: '10:00',
    duration: 60,
  },
  {
    id: '4',
    studentName: 'Jonas Becker',
    day: 'Tuesday',
    time: '15:00',
    duration: 60,
  },
  {
    id: '5',
    studentName: 'Mia Wagner',
    day: 'Wednesday',
    time: '09:00',
    duration: 45,
  },
  {
    id: '6',
    studentName: 'Paul Hoffmann',
    day: 'Wednesday',
    time: '17:00',
    duration: 60,
  },
  {
    id: '7',
    studentName: 'Sophie Klein',
    day: 'Thursday',
    time: '11:00',
    duration: 60,
  },
  {
    id: '8',
    studentName: 'Jonas Becker',
    day: 'Thursday',
    time: '14:00',
    duration: 60,
  },
  {
    id: '9',
    studentName: 'Leon Richter',
    day: 'Friday',
    time: '13:00',
    duration: 45,
  },
  {
    id: '10',
    studentName: 'Anna Müller',
    day: 'Friday',
    time: '16:00',
    duration: 60,
  },
];
