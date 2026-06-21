import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const statusColor =
    appointment.status === 'Confirmed'
      ? COLORS.statusOpen
      : appointment.status === 'Pending'
      ? COLORS.statusBusy
      : COLORS.statusClosed;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.idWrap}>
          <Text style={styles.idLabel}>APPOINTMENT ID</Text>
          <Text style={styles.idValue}>{appointment.id}</Text>
        </View>
        <View style={[styles.statusChip, { backgroundColor: `${statusColor}1A` }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {appointment.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailRow}>
        <BuildingIcon />
        <Text style={styles.detailLabel}>Office</Text>
        <Text style={styles.detailValue}>{appointment.officeName}</Text>
      </View>
      <View style={styles.detailRow}>
        <CalendarIcon />
        <Text style={styles.detailLabel}>Date</Text>
        <Text style={styles.detailValue}>{appointment.date}</Text>
      </View>
      <View style={styles.detailRow}>
        <ClockIcon />
        <Text style={styles.detailLabel}>Time</Text>
        <Text style={styles.detailValue}>{appointment.timeSlot}</Text>
      </View>
    </View>
  );
}

const BuildingIcon = () => (
  <View style={styles.iconWrap}>
    <Text>🏢</Text>
  </View>
);
const CalendarIcon = () => (
  <View style={styles.iconWrap}>
    <Text>📅</Text>
  </View>
);
const ClockIcon = () => (
  <View style={styles.iconWrap}>
    <Text>⏰</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 4,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  idWrap: {
    flex: 1,
  },
  idLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 1,
    marginBottom: 4,
  },
  idValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primaryBlue,
  },
  statusChip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrap: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '500',
    width: 70,
    marginLeft: 6,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    flex: 1,
  },
});
