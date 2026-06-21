import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';

type AuthTab = 'login' | 'signup';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const { loginUser, registerUser } = useAuth();
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [loginMatric, setLoginMatric] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [signupFullName, setSignupFullName] = useState('');
  const [signupMatric, setSignupMatric] = useState('');
  const [signupFaculty, setSignupFaculty] = useState('');
  const [signupDepartment, setSignupDepartment] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadRememberedCredentials = async () => {
      try {
        const savedRememberMe = await AsyncStorage.getItem('rememberMe');

        if (savedRememberMe === 'true') {
          const savedMatric = await AsyncStorage.getItem('rememberedMatric');
          const savedPassword = await AsyncStorage.getItem('rememberedPassword');

          if (savedMatric) setLoginMatric(savedMatric);
          if (savedPassword) setLoginPassword(savedPassword);
          setRememberMe(true);

          if (savedMatric && savedPassword) {
            const result = loginUser(savedMatric, savedPassword);
            if (result.success) {
              navigation.replace('MainApp');
              return;
            }
          }
        }
      } catch (error) {
        console.warn('Failed to load remembered credentials', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadRememberedCredentials();
  }, []);

  const clearSignUpFields = () => {
    setSignupFullName('');
    setSignupMatric('');
    setSignupFaculty('');
    setSignupDepartment('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirmPassword('');
    setShowSignupPassword(false);
    setShowConfirmPassword(false);
  };

  const persistRememberedCredentials = async (matric: string, password: string) => {
    try {
      await AsyncStorage.multiSet([
        ['rememberedMatric', matric],
        ['rememberedPassword', password],
        ['rememberMe', 'true'],
      ]);
    } catch (error) {
      console.warn('Failed to save remembered credentials', error);
    }
  };

  const clearRememberedCredentials = async () => {
    try {
      await AsyncStorage.multiRemove(['rememberedMatric', 'rememberedPassword']);
      await AsyncStorage.setItem('rememberMe', 'false');
    } catch (error) {
      console.warn('Failed to clear remembered credentials', error);
    }
  };

  const handleLogin = async () => {
    const matric = loginMatric.trim();
    const password = loginPassword.trim();

    if (!matric || !password) {
      Alert.alert('Please fill all fields', 'Please enter both your matric number and password.');
      return;
    }

    setLoading(true);
    const result = loginUser(matric, password);

    if (result.success) {
      if (rememberMe) {
        await persistRememberedCredentials(matric, password);
      } else {
        await clearRememberedCredentials();
      }
      setLoading(false);
      navigation.replace('MainApp');
    } else {
      setLoading(false);
      Alert.alert('Invalid matric number or password', result.message);
    }
  };

  const handleSignUp = () => {
    const fullName = signupFullName.trim();
    const matricNumber = signupMatric.trim();
    const faculty = signupFaculty.trim();
    const department = signupDepartment.trim();
    const email = signupEmail.trim();
    const password = signupPassword.trim();
    const confirmPassword = signupConfirmPassword.trim();

    if (!fullName || !matricNumber || !faculty || !department || !email || !password || !confirmPassword) {
      Alert.alert('Please fill all fields', 'Please fill in every sign-up field.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const result = registerUser({
        fullName,
        matricNumber,
        faculty,
        department,
        email,
        password,
      });

      setLoading(false);

      if (!result.success) {
        Alert.alert('Registration Failed', result.message);
        return;
      }

      clearSignUpFields();
      navigation.replace('MainApp');
    }, 500);
  };

  const handleForgotPassword = () => {
    Alert.alert('Please visit ICT Support Unit for assistance.', 'Please visit ICT Support Unit for assistance.');
  };

  const renderInputField = (
    label: string,
    value: string,
    onChange: (text: string) => void,
    placeholder: string,
    iconName: keyof typeof Ionicons.glyphMap,
    secureTextEntry = false,
    rightIcon?: React.ReactNode
  ) => (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <Ionicons name={iconName} size={20} color={COLORS.textLight} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={label === 'Email Address' ? 'email-address' : 'default'}
          returnKeyType="next"
        />
        {rightIcon}
      </View>
    </View>
  );

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.accentGold} />
          <Text style={styles.loadingText}>Checking saved login...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>UNIZIK Connect</Text>
            <Text style={styles.subtitle}>Secure student access to campus services.</Text>
          </View>

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'login' && styles.tabActive]}
              onPress={() => setActiveTab('login')}
            >
              <Text style={[styles.tabLabel, activeTab === 'login' && styles.tabLabelActive]}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'signup' && styles.tabActive]}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={[styles.tabLabel, activeTab === 'signup' && styles.tabLabelActive]}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{activeTab === 'login' ? 'Welcome Back' : 'Create new account'}</Text>
            <Text style={styles.cardSubtitle}>
              {activeTab === 'login'
                ? 'Sign in to continue with your UNIZIK account.'
                : 'Register your student account to access services.'}
            </Text>

            {activeTab === 'login' ? (
              <>
                {renderInputField(
                  'Matric Number',
                  loginMatric,
                  setLoginMatric,
                  'e.g. 2021/242810',
                  'card-outline'
                )}
                {renderInputField(
                  'Password',
                  loginPassword,
                  setLoginPassword,
                  'Enter your password',
                  'lock-closed-outline',
                  !showLoginPassword,
                  <TouchableOpacity
                    onPress={() => setShowLoginPassword((value) => !value)}
                    style={styles.iconButton}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={showLoginPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={COLORS.textLight}
                    />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.rememberRow}
                  activeOpacity={0.8}
                  onPress={() => setRememberMe((value) => !value)}
                >
                  <View style={styles.checkboxWrapper}>
                    <View
                      style={[
                        styles.checkbox,
                        rememberMe ? styles.checkboxChecked : styles.checkboxUnchecked,
                      ]}
                    >
                      {rememberMe && (
                        <Ionicons name="checkmark" size={16} color={COLORS.white} />
                      )}
                    </View>
                    <Text style={styles.rememberLabel}>Remember Me</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.securityNote}>
                  Your credentials are stored locally on this device only.
                </Text>

                <TouchableOpacity
                  style={styles.forgotLink}
                  onPress={handleForgotPassword}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <CustomButton
                  title="Login"
                  onPress={handleLogin}
                  loading={loading}
                  variant="gold"
                />
              </>
            ) : (
              <>
                {renderInputField(
                  'Full Name',
                  signupFullName,
                  setSignupFullName,
                  'Your full name',
                  'person-outline'
                )}
                {renderInputField(
                  'Matric Number',
                  signupMatric,
                  setSignupMatric,
                  'e.g. 2021/242810',
                  'card-outline'
                )}
                {renderInputField(
                  'Faculty',
                  signupFaculty,
                  setSignupFaculty,
                  'Your faculty',
                  'school-outline'
                )}
                {renderInputField(
                  'Department',
                  signupDepartment,
                  setSignupDepartment,
                  'Your department',
                  'library-outline'
                )}
                {renderInputField(
                  'Email Address',
                  signupEmail,
                  setSignupEmail,
                  'you@example.com',
                  'mail-outline'
                )}
                {renderInputField(
                  'Password',
                  signupPassword,
                  setSignupPassword,
                  'Create a password',
                  'lock-closed-outline',
                  !showSignupPassword,
                  <TouchableOpacity
                    onPress={() => setShowSignupPassword((value) => !value)}
                    style={styles.iconButton}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={showSignupPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={COLORS.textLight}
                    />
                  </TouchableOpacity>
                )}
                {renderInputField(
                  'Confirm Password',
                  signupConfirmPassword,
                  setSignupConfirmPassword,
                  'Repeat your password',
                  'lock-closed-outline',
                  !showConfirmPassword,
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword((value) => !value)}
                    style={styles.iconButton}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={COLORS.textLight}
                    />
                  </TouchableOpacity>
                )}

                <CustomButton
                  title="Sign Up"
                  onPress={handleSignUp}
                  loading={loading}
                  variant="gold"
                />
              </>
            )}
          </View>

          <View style={styles.footerTextBox}>
            <Text style={styles.footerText}>.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryBlue,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    color: COLORS.white,
    fontWeight: '900',
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    color: COLORS.white,
    opacity: 0.9,
    lineHeight: 22,
    maxWidth: '85%',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  tabLabel: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.accentGold,
  },
  tabLabelActive: {
    color: COLORS.accentGold,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 28,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primaryBlue,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 22,
    lineHeight: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 10,
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    padding: 0,
  },
  iconButton: {
    padding: 4,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    color: COLORS.primaryBlue,
    fontWeight: '700',
  },
  footerTextBox: {
    marginTop: 18,
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: 13,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  checkboxUnchecked: {
    backgroundColor: 'transparent',
    borderColor: COLORS.textLight,
  },
  rememberLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  securityNote: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 12,
  },
});
