import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS } from '../constants/colors';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => onFinish());
    }, 3000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <Animated.View
      style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
    >
      <View style={styles.logoWrap}>
        <Text style={styles.unizikText}>UNIZIK</Text>
        <View style={styles.divider} />
        <Text style={styles.connectText}>Connect</Text>
      </View>
      <Text style={styles.tagline}>Connecting Students to Campus Services</Text>
      <View style={styles.goldBar} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  unizikText: {
    fontSize: 52,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 2,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.accentGold,
    marginVertical: 12,
    borderRadius: 2,
  },
  connectText: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.accentGold,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: COLORS.white,
    opacity: 0.85,
    textAlign: 'center',
    fontWeight: '500',
  },
  goldBar: {
    position: 'absolute',
    bottom: 60,
    width: 80,
    height: 4,
    backgroundColor: COLORS.accentGold,
    borderRadius: 2,
  },
});
