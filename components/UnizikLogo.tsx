import React from 'react';
import { Image, ImageStyle, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

type Size = 'small' | 'medium' | 'large';

type Props = {
  size?: Size;
  style?: ImageStyle;
  // Allow overriding width in pixels
  width?: number;
};

// Map named sizes to widths (in px). Increased so the logo is more visible.
const SIZE_MAP: Record<Size, number> = {
  small: 64,
  medium: 140,
  large: 260,
};

// `UnizikLogo` renders the official UNIZIK logo from the bundled assets.
// Loads `assets/images/unizik-logo.jpg` using require().
export function UnizikLogo({ size = 'medium', style, width }: Props) {
  const w = width ?? SIZE_MAP[size];

  return (
    <View style={[styles.wrap, { width: w }]}> 
      <Image
        source={require('../assets/images/unizik-logo.jpg')}
        style={[{ width: w, height: w * 0.6, resizeMode: 'contain' }, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UnizikLogo;
