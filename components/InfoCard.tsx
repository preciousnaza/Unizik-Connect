import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';

// InfoCard is a generic card with an icon, title, and value.
// Used on the Home dashboard and Profile screen for quick stats.

type Props = {
  icon: ReactNode;
  title: string;
  value: string;
  accent?: boolean;
};

export function InfoCard({ icon, title, value, accent = false }: Props) {
  return (
    <View
      style={[
        styles.card,
        accent && styles.cardAccent,
        ...(!accent ? [CardShadow] : []),
      ]}
    >
      <View style={[styles.iconWrap, accent && styles.iconWrapAccent]}>
        {icon}
      </View>
      <Text style={[styles.title, accent && styles.titleAccent]}>{title}</Text>
      <Text
        style={[styles.value, accent && styles.valueAccent]}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minHeight: 110,
  },
  cardAccent: {
    backgroundColor: Colors.primary,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  iconWrapAccent: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
    marginBottom: 4,
  },
  titleAccent: {
    color: 'rgba(255,255,255,0.8)',
  },
  value: {
    fontSize: 18,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  valueAccent: {
    color: Colors.white,
  },
});
