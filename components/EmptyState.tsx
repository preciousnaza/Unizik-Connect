import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

// EmptyState shows an illustration (icon), a message, and an optional
// action button when a list has no items (e.g. no appointments).

type Props = {
  icon: ReactNode;
  title: string;
  message: string;
  action?: ReactNode;
};

export function EmptyState({ icon, title, message, action }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
});
