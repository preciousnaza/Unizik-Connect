import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { StatusBadge } from './StatusBadge';
import { Office } from '@/types';
import * as LucideIcons from 'lucide-react-native';

// OfficeCard is used in the Offices directory list.
// Tapping the card navigates to the office's detail screen.

type Props = {
  office: Office;
  onPress: () => void;
};

export function OfficeCard({ office, onPress }: Props) {
  // Dynamically pick the icon from lucide by name.
  const IconComponent = (LucideIcons as any)[office.icon] ?? LucideIcons.Building2;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <IconComponent size={24} color={Colors.primary} strokeWidth={2} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.name} numberOfLines={1}>
            {office.name}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {office.location}
          </Text>
        </View>
        <StatusBadge status={office.status} size="sm" />
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {office.shortDescription}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.hours}>{office.openingHours}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...CardShadow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  location: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  hours: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: Typography.medium,
  },
});
