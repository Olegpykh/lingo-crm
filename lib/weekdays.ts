const dayNames: Record<string, { de: string; en: string }> = {
  Monday: { de: 'Montag', en: 'Monday' },
  Tuesday: { de: 'Dienstag', en: 'Tuesday' },
  Wednesday: { de: 'Mittwoch', en: 'Wednesday' },
  Thursday: { de: 'Donnerstag', en: 'Thursday' },
  Friday: { de: 'Freitag', en: 'Friday' },
};

export function translateDay(day: string, locale: string): string {
  return dayNames[day]?.[locale as 'de' | 'en'] ?? day;
}
