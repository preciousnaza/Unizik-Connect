import React, { useState } from 'react';
import { Image, ImageStyle, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

type Size = 'small' | 'medium' | 'large';

type Props = {
  size?: Size;
  style?: ImageStyle;
  // Allow overriding width in pixels
  width?: number;
};

// Map named sizes to widths (in px). These keep the logo modest and balanced.
const SIZE_MAP: Record<Size, number> = {
  small: 32,
  medium: 88,
  large: 160,
};

// `UnizikLogo` renders the official UNIZIK logo from the bundled assets.
// It prefers `assets/images/unizik-logo.png` (asset uri) and falls back to the
// app icon if the logo asset isn't available at runtime.
export function UnizikLogo({ size = 'medium', style, width }: Props) {
  const [fallback, setFallback] = useState(false);
  const w = width ?? SIZE_MAP[size];

  // Use the asset URI so bundlers don't error if the image file is not present.
  // Expo/React Native understands the `asset:/` scheme for bundled assets.
  const primarySource = { uri: 'asset:/assets/images/unizik-logo.png' };

  return (
    <View style={[styles.wrap, { width: w }]}> 
      {!fallback ? (
        <Image
          source={primarySource}
          style={[{ width: w, height: w * 0.36, resizeMode: 'contain' }, style]}
          onError={() => setFallback(true)}
        />
      ) : (
        <Image
          // fallback to packaged icon
          source={require('@/assets/images/icon.png')}
          style={[{ width: w, height: w * 0.36, resizeMode: 'contain' }, style]}
        />
      )}
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
