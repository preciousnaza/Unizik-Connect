import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { OfficeStatus } from '../types';

interface StatusBadgeProps {
  status: OfficeStatus;
  size?: 'small' | 'medium';
}

const STATUS_COLORS: Record<OfficeStatus, string> = {
  Open: COLORS.statusOpen,
  Busy: COLORS.statusBusy,
  Closed: COLORS.statusClosed,
};

export default function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  const color = STATUS_COLORS[status];
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: `${color}1A` },
        isSmall && styles.badgeSmall,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }, isSmall && styles.textSmall]}>
        {status}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
  textSmall: {
    fontSize: 11,
  },
});
