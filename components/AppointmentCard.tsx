import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { Appointment, AppointmentStatus } from '@/types';
import { Calendar, Clock, FileText, Hash } from 'lucide-react-native';

// AppointmentCard displays a single appointment in the Appointments list.

type Props = {
  appointment: Appointment;
  onCancelRequest: (id: string) => void;
};

function getStatusStyles(status: AppointmentStatus) {
  switch (status) {
    case 'confirmed':
      return { badgeBg: Colors.openTint, badgeText: Colors.open };
    case 'pending':
      return { badgeBg: Colors.busyTint, badgeText: Colors.busy };
  }
}

function formatStatusLabel(status: AppointmentStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function AppointmentCard({ appointment, onCancelRequest }: Props) {
  const statusStyles = getStatusStyles(appointment.status);
  const isConfirmed = appointment.status === 'confirmed';

  const handleCancelPress = () => {
    console.log('Cancel button clicked:', appointment.id);
    onCancelRequest(appointment.id);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.officeIcon}>
          <FileText size={20} color={Colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.officeName} numberOfLines={1}>
          {appointment.officeName}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: statusStyles.badgeBg }]}>
          <Text style={[styles.statusText, { color: statusStyles.badgeText }]}>
            Status: {formatStatusLabel(appointment.status)}
          </Text>
        </View>
      </View>

      <View style={styles.idRow}>
        <Hash size={14} color={Colors.textMuted} strokeWidth={2} />
        <Text style={styles.idText}>{appointment.id}</Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <Calendar size={16} color={Colors.textMuted} strokeWidth={2} />
          <Text style={styles.detailText}>{appointment.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Clock size={16} color={Colors.textMuted} strokeWidth={2} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
      </View>

      <View style={styles.reasonBox}>
        <Text style={styles.reasonLabel}>Reason</Text>
        <Text style={styles.reasonText} numberOfLines={2}>
          {appointment.reason}
        </Text>
      </View>

      {isConfirmed ? (
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.8}
          onPress={handleCancelPress}
        >
          <Text style={styles.cancelBtnText}>Cancel Appointment</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...CardShadow,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  officeIcon: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  officeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
  },
  statusText: {
    fontSize: 11,
    fontWeight: Typography.bold,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  idText: {
    fontSize: 13,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  detailRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: Typography.medium,
  },
  reasonBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  reasonLabel: {
    fontSize: 11,
    fontWeight: Typography.bold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  cancelBtn: {
    marginTop: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: Colors.closed,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    fontWeight: Typography.bold,
    color: Colors.closed,
  },
});
