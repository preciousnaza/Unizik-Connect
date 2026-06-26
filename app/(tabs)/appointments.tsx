import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useAppointments } from '@/hooks/useAppointments';
import { AppointmentCard } from '@/components/AppointmentCard';
import { EmptyState } from '@/components/EmptyState';
import { CustomButton } from '@/components/CustomButton';
import { CalendarPlus } from 'lucide-react-native';

// Appointments screen — lists all requested appointments.
// Shows an empty state with a "Book Now" button when there are none.

export default function AppointmentsScreen() {
  const { appointments, cancelAppointment } = useAppointments();
  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);

  const handleCancelRequest = (id: string) => {
    setPendingCancelId(id);
  };

  const handleDismissCancel = () => {
    setPendingCancelId(null);
  };

  const handleConfirmCancel = () => {
    if (pendingCancelId) {
      cancelAppointment(pendingCancelId);
    }
    setPendingCancelId(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Appointments</Text>
        <Text style={styles.subtitle}>
          {appointments.length}{' '}
          {appointments.length === 1 ? 'appointment' : 'appointments'} booked
        </Text>
      </View>

      {appointments.length === 0 ? (
        <EmptyState
          icon={<Text style={styles.emptyIcon}>📅</Text>}
          title="No Appointments Yet"
          message="You have not booked any appointments yet."
          action={
            <CustomButton
              title="Book Appointment"
              onPress={() => router.push('/appointment/new')}
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
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancelRequest={handleCancelRequest}
            />
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

      {/* Cancel confirmation overlay */}
      {pendingCancelId && (
        <View style={styles.confirmOverlay}>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={handleDismissCancel}
          />
          <View style={styles.confirmCard}>
            <Text style={styles.confirmTitle}>Cancel Appointment?</Text>
            <Text style={styles.confirmMessage}>
              Are you sure you want to remove this appointment?
            </Text>
            <View style={styles.confirmActions}>
              <TouchableOpacity
                style={styles.confirmNoBtn}
                activeOpacity={0.8}
                onPress={handleDismissCancel}
              >
                <Text style={styles.confirmNoText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmYesBtn}
                activeOpacity={0.8}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.confirmYesText}>Yes, Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  emptyIcon: {
    fontSize: 44,
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
  confirmOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
    zIndex: 100,
  },
  confirmCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 340,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  confirmMessage: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  confirmNoBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  confirmNoText: {
    fontSize: 15,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  confirmYesBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.closed,
    alignItems: 'center',
  },
  confirmYesText: {
    fontSize: 15,
    fontWeight: Typography.bold,
    color: Colors.white,
  },
});
