import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { OfficeStatus } from '@/types';

// StatusBadge renders a colored pill showing an office's availability.
// The color and label come from the status prop.

const STATUS_CONFIG: Record<
  OfficeStatus,
  { label: string; color: string; tint: string }
> = {
  open: { label: 'Open', color: Colors.open, tint: Colors.openTint },
  busy: { label: 'Busy', color: Colors.busy, tint: Colors.busyTint },
  closed: { label: 'Closed', color: Colors.closed, tint: Colors.closedTint },
};

type Props = {
  status: OfficeStatus;
  size?: 'sm' | 'md';
};

export function StatusBadge({ status, size = 'md' }: Props) {
  const config = STATUS_CONFIG[status];
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: config.tint },
        isSmall && styles.badgeSmall,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text
        style={[
          styles.label,
          { color: config.color },
          isSmall && styles.labelSmall,
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.pill,
    gap: Spacing.xs,
  },
  badgeSmall: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: Typography.bold,
  },
  labelSmall: {
    fontSize: 11,
  },
});
