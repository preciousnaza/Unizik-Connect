import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography, CardShadow } from '@/constants/theme';
import { Appointment } from '@/types';
import { Calendar, Clock, FileText, Hash } from 'lucide-react-native';

// AppointmentCard displays a single appointment in the Appointments list.

type Props = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.officeIcon}>
          <FileText size={20} color={Colors.primary} strokeWidth={2} />
        </View>
        <Text style={styles.officeName} numberOfLines={1}>
          {appointment.officeName}
        </Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
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
    backgroundColor: Colors.openTint,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
  },
  statusText: {
    fontSize: 11,
    fontWeight: Typography.bold,
    color: Colors.open,
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
});
