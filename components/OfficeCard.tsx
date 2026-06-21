import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { Office } from '../types';
import StatusBadge from './StatusBadge';

interface OfficeCardProps {
  office: Office;
  onPress: () => void;
}

export default function OfficeCard({ office, onPress }: OfficeCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      <View style={styles.left}>
        <View style={styles.iconWrap}>
          <Ionicons name="business" size={22} color={COLORS.primaryBlue} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {office.name}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge status={office.status} size="small" />
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {office.description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  left: {
    marginRight: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: `${COLORS.primaryBlue}14`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  badgeRow: {
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
});
