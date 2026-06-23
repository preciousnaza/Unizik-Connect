import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { Mail, Lock } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import UnizikLogo from '@/components/UnizikLogo';

export default function LoginScreen() {
  const { login } = useAuth();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!email || !password) return 'Please fill in all fields.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleLogin = async () => {
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    const res = await login(email.trim().toLowerCase(), password);
    setLoading(false);
    if (!res.ok) setError(res.error || 'Login failed');
    else router.replace('/(tabs)');
  };

  // If already logged in, go to tabs
  React.useEffect(() => {
    if (user) router.replace('/(tabs)');
  }, [user]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ alignItems: 'center', marginBottom: Spacing.md }}>
        <UnizikLogo size="medium" width={92} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue to UNIZIK Connect</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.field}>
          <Mail size={18} color={Colors.primary} />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Lock size={18} color={Colors.primary} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => router.push('/signup')}>
          <Text style={styles.linkText}>Don't have an account? Create one</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface, justifyContent: 'center', padding: Spacing.lg },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, ...CardShadow },
  title: { fontSize: 22, fontWeight: Typography.bold, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: Spacing.md },
  field: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.surface, padding: Spacing.sm, borderRadius: Radius.md, marginBottom: Spacing.sm },
  input: { flex: 1, paddingVertical: 8, color: Colors.text },
  button: { backgroundColor: Colors.primary, padding: Spacing.md, borderRadius: Radius.md, alignItems: 'center', marginTop: Spacing.md },
  buttonText: { color: Colors.white, fontWeight: Typography.bold },
  link: { marginTop: Spacing.md, alignItems: 'center' },
  linkText: { color: Colors.primary, fontWeight: Typography.medium },
  error: { color: '#b00020', marginBottom: Spacing.sm },
});
