import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { offices, sampleAppointment } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { SectionHeader } from '@/components/SectionHeader';
import { StatusBadge } from '@/components/StatusBadge';
import UnizikLogo from '@/components/UnizikLogo';
import { Building2, CalendarPlus, MessageCircle, User, Calendar, Clock, ChevronRight, Bell } from 'lucide-react-native';

// Home screen — the dashboard. Shows a welcome header, quick action grid,
// office status overview, and the upcoming appointment card.

export default function HomeScreen() {
  const { user } = useAuth();
  // Quick actions navigate to other tabs or the appointment form.
  const quickActions = [
    { label: 'Offices', icon: Building2, route: '/(tabs)/offices' as const },
    { label: 'Book Appointment', icon: CalendarPlus, route: '/appointment/new' as const },
    { label: 'Ask Assistant', icon: MessageCircle, route: '/(tabs)/assistant' as const },
    { label: 'Profile', icon: User, route: '/(tabs)/profile' as const },
  ];

  // Show the first 3 offices as a quick status overview.
  const statusOverview = offices.slice(0, 3);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header with gradient background */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
              <View>
                <Text style={styles.greeting}>Welcome back,</Text>
                <Text style={styles.studentName}>{user ? user.name.split(' ')[0] : 'Student'}</Text>
              </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.bellWrap}>
                <Bell size={20} color={Colors.white} strokeWidth={2} />
                <View style={styles.bellDot} />
              </TouchableOpacity>
              <UnizikLogo size="small" width={40} />
            </View>
          </View>
          <Text style={styles.headerSubtitle}>Connecting Students to Campus Services</Text>
        </View>

        {/* Quick action grid */}
        <View style={styles.section}>
          <View style={styles.quickGrid}>
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={action.label}
                  style={styles.quickCard}
                  activeOpacity={0.8}
                  onPress={() => router.push(action.route)}
                >
                  <View style={styles.quickIconWrap}>
                    <Icon size={24} color={Colors.primary} strokeWidth={2} />
                  </View>
                  <Text style={styles.quickLabel}>{action.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Office status overview */}
        <View style={styles.section}>
          <SectionHeader title="Office Status" subtitle="View all" />
          <View style={styles.statusList}>
            {statusOverview.map((office) => (
              <View key={office.id} style={styles.statusRow}>
                <View style={styles.statusLeft}>
                  <Text style={styles.statusName}>{office.name}</Text>
                </View>
                <StatusBadge status={office.status} size="sm" />
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming appointment card */}
        <View style={styles.section}>
          <SectionHeader title="Upcoming Appointment" />
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.appointmentIcon}>
                <Calendar size={20} color={Colors.white} strokeWidth={2} />
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentOffice}>{sampleAppointment.officeName}</Text>
                <Text style={styles.appointmentId}>{sampleAppointment.id}</Text>
              </View>
              <View style={styles.confirmedBadge}>
                <Text style={styles.confirmedText}>Confirmed</Text>
              </View>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.appointmentDetail}>
                <Calendar size={16} color={Colors.textMuted} strokeWidth={2} />
                <Text style={styles.appointmentDetailText}>{sampleAppointment.date}</Text>
              </View>
              <View style={styles.appointmentDetail}>
                <Clock size={16} color={Colors.textMuted} strokeWidth={2} />
                <Text style={styles.appointmentDetailText}>{sampleAppointment.time}</Text>
              </View>
            </View>
            <Text style={styles.appointmentReason}>{sampleAppointment.reason}</Text>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => router.push('/(tabs)/appointments')}
            >
              <Text style={styles.viewAllText}>View all appointments</Text>
              <ChevronRight size={16} color={Colors.primary} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: Typography.regular,
  },
  studentName: {
    fontSize: 24,
    color: Colors.white,
    fontWeight: Typography.bold,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bellWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: Spacing.sm,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'flex-start',
    ...CardShadow,
  },
  quickIconWrap: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  quickLabel: {
    fontSize: 14,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  statusList: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...CardShadow,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statusLeft: {
    flex: 1,
  },
  statusName: {
    fontSize: 15,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
  appointmentCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    ...CardShadow,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  appointmentIcon: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentOffice: {
    fontSize: 16,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  appointmentId: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  confirmedBadge: {
    backgroundColor: Colors.openTint,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
  },
  confirmedText: {
    fontSize: 11,
    fontWeight: Typography.bold,
    color: Colors.open,
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  appointmentDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  appointmentDetailText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: Typography.medium,
  },
  appointmentReason: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
});
