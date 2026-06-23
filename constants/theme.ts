// Centralized color palette and spacing tokens.
// Using constants (instead of inline values) keeps the look consistent
// and makes rebranding a one-file change.

export const Colors = {
  primary: '#003B8E', // UNIZIK deep blue
  primaryDark: '#002563',
  secondary: '#0057D9', // lighter interactive blue
  accent: '#F4B400', // gold
  background: '#FFFFFF',
  surface: '#F5F7FA', // light background
  text: '#1F2937',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',

  // Status colors
  open: '#22C55E',
  busy: '#F59E0B',
  closed: '#EF4444',

  // Status tints (light backgrounds for badges)
  openTint: '#DCFCE7',
  busyTint: '#FEF3C7',
  closedTint: '#FEE2E2',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const Typography = {
  // 3 weights only, per design system.
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

// Shared shadow for cards — gives the soft, elevated banking-app feel.
export const CardShadow = {
  shadowColor: '#1F2937',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
};
