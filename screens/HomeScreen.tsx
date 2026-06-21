import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { OFFICES } from '../data/offices';
import AppointmentCard from '../components/AppointmentCard';
import StatusBadge from '../components/StatusBadge';
import { useAppointments } from '../context/AppointmentsContext';
import { useAuth } from '../context/AuthContext';

type OfficeStatusOverview = {
  id: string;
  name: string;
  status: 'Open' | 'Busy' | 'Closed';
};

const QUICK_ACTIONS = [
  { id: 'offices', label: 'Offices', icon: '🏢' as const, color: COLORS.primaryBlue },
  { id: 'appointment', label: 'Book Appointment', icon: '📅' as const, color: COLORS.secondaryBlue },
  { id: 'assistant', label: 'Ask Assistant', icon: '🤖' as const, color: COLORS.accentGold },
  { id: 'profile', label: 'Profile', icon: '👤' as const, color: COLORS.primaryBlue },
];

const HOME_OFFICE_OVERVIEW: OfficeStatusOverview[] = [
  { id: 'registry', name: 'Registry', status: 'Open' },
  { id: 'library', name: 'Library', status: 'Busy' },
  { id: 'student-affairs', name: 'Student Affairs', status: 'Open' },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { currentUser } = useAuth();
  const { appointments } = useAppointments();
  const userAppointments = currentUser
    ? appointments.filter(
        (appt) => appt.studentMatricNumber === currentUser.matricNumber
      )
    : [];
  const nextAppointment = userAppointments[0];
  const firstName = currentUser?.fullName.split(' ')[0] ?? 'Student';
  const openOfficeCount = OFFICES.filter((office) => office.status === 'Open').length;

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'offices':
        navigation.navigate('Offices');
        break;
      case 'appointment':
        navigation.navigate('Appointments');
        break;
      case 'assistant':
        navigation.navigate('Assistant');
        break;
      case 'profile':
        navigation.navigate('Profile');
        break;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.welcomeBlock}>
            <Text style={styles.welcome}>Hello, {firstName} 👋</Text>
            <Text style={styles.subtitle}>Your campus dashboard is ready.</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarText}>{currentUser?.initials ?? 'UN'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Matric</Text>
            <Text style={styles.summaryValue}>{currentUser?.matricNumber ?? 'N/A'}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Upcoming</Text>
            <Text style={styles.summaryValue}>{userAppointments.length}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Open Offices</Text>
            <Text style={styles.summaryValue}>{openOfficeCount}</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.quickActionCard}
              onPress={() => handleQuickAction(action.id)}
              activeOpacity={0.85}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: `${action.color}1A` }]}
              >
                <Text style={styles.quickActionEmoji}>{action.icon}</Text>
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Office Status Overview</Text>
        <View style={styles.statusRow}>
          {HOME_OFFICE_OVERVIEW.map((item) => (
            <View key={item.id} style={styles.statusItem}>
              <Text style={styles.statusItemName}>{item.name}</Text>
              <StatusBadge status={item.status} size="small" />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next Appointment</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
            <Text style={styles.viewAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        {nextAppointment ? (
          <AppointmentCard appointment={nextAppointment} />
        ) : (
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyStateTitle}>No upcoming bookings yet</Text>
            <Text style={styles.emptyStateSubtitle}>
              Book an appointment with any available office to stay on track.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Open Office Fast-Links</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {OFFICES.filter((o) => o.status === 'Open')
            .slice(0, 5)
            .map((office) => (
              <TouchableOpacity
                key={office.id}
                style={styles.officeChip}
                onPress={() =>
                  navigation.navigate('Offices', {
                    screen: 'OfficeDetails',
                    params: { officeId: office.id },
                  })
                }
                activeOpacity={0.85}
              >
                <Ionicons name="business" size={16} color={COLORS.primaryBlue} />
                <Text style={styles.officeChipText} numberOfLines={1}>
                  {office.shortName}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  header: {
    backgroundColor: COLORS.primaryBlue,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 28,
    marginBottom: -20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.85,
    marginTop: 4,
  },
  avatarBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryBlue,
  },
  card: {
    paddingHorizontal: 16,
  },
  quickActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'flex-start',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryBlue,
  },
  emptyStateCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  welcomeBlock: {
    flex: 1,
    paddingRight: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
  },
  statusItemName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  officeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
    gap: 6,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  officeChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    maxWidth: 100,
  },
});
