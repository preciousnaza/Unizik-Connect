import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';

// CustomButton is the app's primary action button.
// Variants: 'primary' (blue), 'gold' (accent), 'outline', 'ghost'.
// Supports a loading state and optional left icon node.

type Variant = 'primary' | 'gold' | 'outline' | 'ghost';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

export function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
}: Props) {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isGold = variant === 'gold';

  const backgroundColor = isOutline || isGhost
    ? 'transparent'
    : isGold
      ? Colors.accent
      : Colors.primary;

  const textColor = isOutline || isGhost ? Colors.primary : Colors.white;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        { backgroundColor },
        isOutline && styles.outline,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon}
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
  },
  fullWidth: {
    width: '100%',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: Typography.bold,
  },
});
