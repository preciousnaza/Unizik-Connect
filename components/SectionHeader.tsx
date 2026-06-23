import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants/theme';

// SectionHeader is a simple title + optional "see all" style subtitle.
// Used to label sections on the Home screen.

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  title: {
    fontSize: 18,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: Typography.medium,
  },
});
