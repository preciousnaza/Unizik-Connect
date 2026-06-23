import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import { GraduationCap } from 'lucide-react-native';

// Splash screen: shows the logo, app name, and tagline with a fade-in,
// then auto-navigates to the main tabs after ~2.5 seconds.

export default function SplashScreen() {
  // Shared values drive the animated opacity of each element.
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Stagger the fade-ins for a polished entrance.
    logoOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));

    // Navigate to the tab layout after the animation completes.
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));
  const titleStyle = useAnimatedStyle(() => ({ opacity: titleOpacity.value }));
  const taglineStyle = useAnimatedStyle(() => ({ opacity: taglineOpacity.value }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, logoStyle]}>
        <View style={styles.logoCircle}>
          <GraduationCap size={64} color={Colors.white} strokeWidth={1.5} />
        </View>
      </Animated.View>

      <Animated.View style={titleStyle}>
        <Text style={styles.title}>UNIZIK Connect</Text>
      </Animated.View>

      <Animated.View style={taglineStyle}>
        <Text style={styles.tagline}>Connecting Students to Campus Services</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  title: {
    fontSize: 32,
    fontWeight: Typography.bold,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontWeight: Typography.regular,
  },
});
