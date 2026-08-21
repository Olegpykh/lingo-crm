export const levelPalette: Record<
  string,
  { solid: string; bg: string; text: string }
> = {
  A1: { solid: '#22c55e', bg: '#dcfce7', text: '#15803d' },
  A2: { solid: '#22c55e', bg: '#dcfce7', text: '#15803d' },
  B1: { solid: '#4f46e5', bg: '#e0e7ff', text: '#4338ca' },
  B2: { solid: '#4f46e5', bg: '#e0e7ff', text: '#4338ca' },
  C1: { solid: '#f59e0b', bg: '#fef3c7', text: '#b45309' },
  C2: { solid: '#f59e0b', bg: '#fef3c7', text: '#b45309' },
};

export const paymentColors: Record<string, string> = {
  Bezahlt: '#22c55e',
  Ausstehend: '#f59e0b',
  Überfällig: '#ef4444',
};
