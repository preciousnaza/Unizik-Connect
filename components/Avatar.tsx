import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Typography } from '@/constants/theme';

// Avatar shows a student's initials in a colored circle.
// Used on the Profile screen and Home header.

type Props = {
  initials: string;
  size?: number;
};

export function Avatar({ initials, size = 56 }: Props) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    fontWeight: Typography.bold,
  },
});
