import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { currentUser, logoutUser } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            const remembered = await AsyncStorage.getItem('rememberMe');
            if (remembered !== 'true') {
              await AsyncStorage.multiRemove(['rememberedMatric', 'rememberedPassword']);
              await AsyncStorage.setItem('rememberMe', 'false');
            }
          } catch (error) {
            console.warn('Failed to update remembered login on logout', error);
          }

          logoutUser();
        },
      },
    ]);
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No student signed in.</Text>
          <Text style={styles.emptySubtitle}>Please log in to view your profile.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const detailRows: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { label: 'Matric Number', value: currentUser.matricNumber, icon: 'card-outline' },
    { label: 'Faculty', value: currentUser.faculty, icon: 'school-outline' },
    { label: 'Department', value: currentUser.department, icon: 'library-outline' },
    { label: 'Email', value: currentUser.email, icon: 'mail-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{currentUser.initials}</Text>
          </View>
          <Text style={styles.name}>{currentUser.fullName}</Text>
          <Text style={styles.email}>{currentUser.email}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={20} color={COLORS.primaryBlue} />
            <Text style={styles.cardTitle}>Student Information</Text>
          </View>
          <View style={styles.divider} />
          {detailRows.map((row, idx) => (
            <View
              key={row.label}
              style={[
                styles.detailRow,
                idx === detailRows.length - 1 && { marginBottom: 0 },
              ]}
            >
              <View style={styles.detailIcon}>
                <Ionicons name={row.icon} size={18} color={COLORS.primaryBlue} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{row.label}</Text>
                <Text style={styles.detailValue}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appName}>UNIZIK Connect</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>Connecting Students to Campus Services</Text>
        </View>

        <View style={styles.logoutButtonWrapper}>
          <CustomButton
            title="Logout"
            onPress={handleLogout}
            variant="outline"
          />
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  header: {
    backgroundColor: COLORS.primaryBlue,
    paddingTop: 60,
    paddingBottom: 28,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginBottom: 20,
  },
  avatarWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: `${COLORS.white}55`,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '900',
    color: COLORS.primaryBlue,
  },
  name: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: '800',
  },
  email: {
    marginTop: 8,
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.92,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primaryBlue}12`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '600',
  },
  appInfo: {
    marginTop: 32,
    alignItems: 'center',
  },
  appName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryBlue,
  },
  appVersion: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
  appTagline: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutButtonWrapper: {
    marginTop: 24,
    marginHorizontal: 16,
  },
});

