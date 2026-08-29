import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, 'E-Mail ist erforderlich')
  .email('Ungültige E-Mail-Adresse');


export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}
