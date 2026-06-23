import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useAppointments } from '@/hooks/useAppointments';
import { AppointmentCard } from '@/components/AppointmentCard';
import { EmptyState } from '@/components/EmptyState';
import { CustomButton } from '@/components/CustomButton';
import { CalendarX2, CalendarPlus } from 'lucide-react-native';

// Appointments screen — lists all requested appointments.
// Shows an empty state with a "Book Now" button when there are none.

export default function AppointmentsScreen() {
  const { appointments } = useAppointments();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
        <Text style={styles.subtitle}>
          {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'} booked
        </Text>
      </View>

      {appointments.length === 0 ? (
        <EmptyState
          icon={<CalendarX2 size={44} color={Colors.primary} strokeWidth={1.5} />}
          title="No Appointments Yet"
          message="You haven't booked any appointments. Tap the button below to schedule a visit with a university office."
          action={
            <CustomButton
              title="Book Now"
              onPress={() => router.push('/appointment/new')}
              icon={<CalendarPlus size={20} color={Colors.white} strokeWidth={2} />}
              fullWidth={false}
            />
          }
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        >
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}

          {/* Book another appointment */}
          <TouchableOpacity
            style={styles.bookMoreBtn}
            onPress={() => router.push('/appointment/new')}
          >
            <CalendarPlus size={20} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.bookMoreText}>Book Another Appointment</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  bookMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    marginTop: Spacing.sm,
  },
  bookMoreText: {
    fontSize: 15,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
});
