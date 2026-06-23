import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import UnizikLogo from '@/components/UnizikLogo';

export default function SignUpScreen() {
  const { signup } = useAuth();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [matric, setMatric] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name || !matric || !faculty || !department || !level || !email || !password)
      return 'Please fill in all fields.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleCreate = async () => {
    setError(null);
    const v = validate();
    if (v) return setError(v);
    setLoading(true);
    const res = await signup({ name, matricNumber: matric, faculty, department, level, email }, password);
    setLoading(false);
    if (!res.ok) setError(res.error || 'Failed to create account');
    else router.replace('/(tabs)');
  };

  React.useEffect(() => {
    if (user) router.replace('/(tabs)');
  }, [user]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: Spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: Spacing.md }}>
          <UnizikLogo size="medium" width={88} />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Create your UNIZIK student profile</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Matric Number" style={styles.input} value={matric} onChangeText={setMatric} />
          <TextInput placeholder="Faculty" style={styles.input} value={faculty} onChangeText={setFaculty} />
          <TextInput placeholder="Department" style={styles.input} value={department} onChangeText={setDepartment} />
          <TextInput placeholder="Level (e.g. 300L)" style={styles.input} value={level} onChangeText={setLevel} />
          <TextInput placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input} value={email} onChangeText={setEmail} />
          <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

          <TouchableOpacity style={styles.button} onPress={handleCreate} activeOpacity={0.8}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Create Account</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => router.back()}>
            <Text style={styles.linkText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surface },
  card: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.lg, ...CardShadow },
  title: { fontSize: 22, fontWeight: Typography.bold, color: Colors.text, marginBottom: Spacing.xs },
  subtitle: { fontSize: 13, color: Colors.textMuted, marginBottom: Spacing.md },
  input: { backgroundColor: Colors.surface, padding: Spacing.sm, borderRadius: Radius.md, marginBottom: Spacing.sm, color: Colors.text },
  button: { backgroundColor: Colors.primary, padding: Spacing.md, borderRadius: Radius.md, alignItems: 'center', marginTop: Spacing.md },
  buttonText: { color: Colors.white, fontWeight: Typography.bold },
  link: { marginTop: Spacing.md, alignItems: 'center' },
  linkText: { color: Colors.primary, fontWeight: Typography.medium },
  error: { color: '#b00020', marginBottom: Spacing.sm },
});
