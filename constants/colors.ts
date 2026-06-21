export const COLORS = {
  primaryBlue: '#003B8E',
  secondaryBlue: '#0057D9',
  accentGold: '#F4B400',
  background: '#FFFFFF',
  lightBackground: '#F5F7FA',
  text: '#1F2937',
  textLight: '#6B7280',
  statusOpen: '#22C55E',
  statusBusy: '#F59E0B',
  statusClosed: '#EF4444',
  white: '#FFFFFF',
  border: '#E5E7EB',
  cardShadow: 'rgba(0, 59, 142, 0.08)',
  chatBubbleBot: '#F1F2F6',
} as const;

export type ColorKey = keyof typeof COLORS;
