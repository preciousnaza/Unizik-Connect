import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { OFFICES, getOfficeById } from '../data/offices';
import { useAppointments } from '../context/AppointmentsContext';
import { useAuth } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import AppointmentCard from '../components/AppointmentCard';

const TIME_SLOTS = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
];

const SAMPLE_DATES = [
  { full: 'Monday, July 7, 2025', short: 'Mon 7' },
  { full: 'Tuesday, July 8, 2025', short: 'Tue 8' },
  { full: 'Wednesday, July 9, 2025', short: 'Wed 9' },
  { full: 'Thursday, July 10, 2025', short: 'Thu 10' },
  { full: 'Friday, July 11, 2025', short: 'Fri 11' },
];

interface ConfirmationModalProps {
  visible: boolean;
  appointmentId: string | null;
  officeName: string;
  date: string;
  time: string;
  onClose: () => void;
}

function ConfirmationModal({
  visible,
  appointmentId,
  officeName,
  date,
  time,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <View style={styles.modalSuccessIcon}>
            <Text style={styles.modalEmoji}>✅</Text>
          </View>
          <Text style={styles.modalTitle}>Appointment Confirmed!</Text>
          <Text style={styles.modalId}>
            ID: {appointmentId ?? 'UNI-00X'}
          </Text>
          <View style={styles.modalDetails}>
            <View style={styles.modalDetailRow}>
              <Text style={styles.modalDetailLabel}>Office</Text>
              <Text style={styles.modalDetailValue}>{officeName}</Text>
            </View>
            <View style={styles.modalDetailRow}>
              <Text style={styles.modalDetailLabel}>Date</Text>
              <Text style={styles.modalDetailValue}>{date}</Text>
            </View>
            <View style={styles.modalDetailRow}>
              <Text style={styles.modalDetailLabel}>Time</Text>
              <Text style={styles.modalDetailValue}>{time}</Text>
            </View>
          </View>
          <CustomButton title="Done" onPress={onClose} variant="primary" />
        </View>
      </View>
    </Modal>
  );
}

export default function AppointmentBookingScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { currentUser } = useAuth();
  const { appointments, addAppointment, appointmentExists } = useAppointments();

  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(
    route.params?.officeId ?? OFFICES[0].id
  );
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showOfficePicker, setShowOfficePicker] = useState(false);
  const [confirmationApptId, setConfirmationApptId] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (route.params?.officeId) {
      setSelectedOfficeId(route.params.officeId);
    }
  }, [route.params?.officeId]);

  const selectedOffice = getOfficeById(selectedOfficeId);
  const selectedDate = SAMPLE_DATES[selectedDateIndex].full;

  const bookedTimeSlots = appointments
    .filter(
      (appt) =>
        appt.officeName === selectedOffice?.name &&
        appt.date === selectedDate
    )
    .map((appt) => appt.timeSlot);

  const userAppointments = currentUser
    ? appointments.filter(
        (appt) => appt.studentMatricNumber === currentUser.matricNumber
      )
    : [];

  const handleBook = () => {
    if (!selectedTime) {
      Alert.alert('Select Time', 'Please select an available time slot.');
      return;
    }

    if (!currentUser) {
      Alert.alert('Not signed in', 'Please log in to book an appointment.');
      return;
    }

    if (appointmentExists(selectedOffice?.name ?? '', selectedDate, selectedTime)) {
      Alert.alert(
        'This time slot is already booked',
        'This time slot is already booked. Please select a different time or date.'
      );
      return;
    }

    const newAppt = addAppointment({
      officeName: selectedOffice?.name ?? '',
      date: selectedDate,
      timeSlot: selectedTime,
      studentMatricNumber: currentUser.matricNumber,
    });
    setConfirmationApptId(newAppt.id);
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setSelectedTime('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Appointment</Text>
        <Text style={styles.headerSubtitle}>
          Reserve a slot with any university office
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.stepLabel}>Step 1 — Select Office</Text>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => setShowOfficePicker((v) => !v)}
          activeOpacity={0.85}
        >
          <View style={styles.pickerLeft}>
            <View style={styles.pickerIcon}>
              <Ionicons name="business" size={20} color={COLORS.primaryBlue} />
            </View>
            <View>
              <Text style={styles.pickerLabel}>Selected Office</Text>
              <Text style={styles.pickerValue} numberOfLines={1}>
                {selectedOffice?.name}
              </Text>
            </View>
          </View>
          <Ionicons
            name={showOfficePicker ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={COLORS.textLight}
          />
        </TouchableOpacity>

        {showOfficePicker && (
          <View style={styles.officeList}>
            <ScrollView nestedScrollEnabled style={{ maxHeight: 240 }}>
              {OFFICES.map((office) => {
                const isSelected = office.id === selectedOfficeId;
                return (
                  <TouchableOpacity
                    key={office.id}
                    style={[
                      styles.officeListItem,
                      isSelected && styles.officeListItemActive,
                    ]}
                    onPress={() => {
                      setSelectedOfficeId(office.id);
                      setShowOfficePicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.officeListItemText,
                        isSelected && styles.officeListItemTextActive,
                      ]}
                      numberOfLines={1}
                    >
                      {office.name}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={COLORS.primaryBlue}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        <Text style={styles.stepLabel}>Step 2 — Select Date</Text>
        <View style={styles.datePicker}>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() =>
              setSelectedDateIndex((i) => Math.max(0, i - 1))
            }
            disabled={selectedDateIndex === 0}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={selectedDateIndex === 0 ? COLORS.border : COLORS.primaryBlue}
            />
          </TouchableOpacity>
          <View style={styles.dateDisplay}>
            <Ionicons name="calendar" size={18} color={COLORS.primaryBlue} />
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>
          <TouchableOpacity
            style={styles.arrowBtn}
            onPress={() =>
              setSelectedDateIndex((i) =>
                Math.min(SAMPLE_DATES.length - 1, i + 1)
              )
            }
            disabled={selectedDateIndex === SAMPLE_DATES.length - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={22}
              color={
                selectedDateIndex === SAMPLE_DATES.length - 1
                  ? COLORS.border
                  : COLORS.primaryBlue
              }
            />
          </TouchableOpacity>
        </View>

        <View style={styles.dateChipsRow}>
          {SAMPLE_DATES.map((d, i) => (
            <TouchableOpacity
              key={d.full}
              style={[
                styles.dateChip,
                selectedDateIndex === i && styles.dateChipActive,
              ]}
              onPress={() => setSelectedDateIndex(i)}
            >
              <Text
                style={[
                  styles.dateChipText,
                  selectedDateIndex === i && styles.dateChipTextActive,
                ]}
              >
                {d.short}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.stepLabel}>Step 3 — Select Time Slot</Text>
        <View style={styles.timeSlots}>
          {TIME_SLOTS.map((slot) => {
            const isBooked = bookedTimeSlots.includes(slot);
            const isSelected = selectedTime === slot;
            return (
              <View key={slot} style={styles.timeSlotWrapper}>
                <TouchableOpacity
                  style={[
                    styles.timeSlot,
                    isSelected && styles.timeSlotActive,
                    isBooked && styles.timeSlotBooked,
                  ]}
                  onPress={() => !isBooked && setSelectedTime(slot)}
                  activeOpacity={isBooked ? 1 : 0.85}
                  disabled={isBooked}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      isSelected && styles.timeSlotTextActive,
                      isBooked && styles.timeSlotTextBooked,
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
                {isBooked && <Text style={styles.bookedTag}>Booked</Text>}
              </View>
            );
          })}
        </View>

        <View style={{ height: 16 }} />

        <CustomButton
          title="Book Appointment"
          onPress={handleBook}
          variant="primary"
          icon={<Ionicons name="checkmark-circle" size={20} color={COLORS.white} />}
        />

        {userAppointments.length > 0 ? (
          <View style={styles.existingSection}>
            <Text style={styles.sectionTitle}>Your Appointments</Text>
            {userAppointments.slice(0, 3).map((appt) => (
              <View key={appt.id} style={{ marginBottom: 10 }}>
                <AppointmentCard appointment={appt} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyAppointments}>
            <Text style={styles.emptyAppointmentsText}>
              You have no appointments yet. Book one from the Offices tab.
            </Text>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      <ConfirmationModal
        visible={showConfirmation}
        appointmentId={confirmationApptId}
        officeName={selectedOffice?.name ?? ''}
        date={selectedDate}
        time={selectedTime || ''}
        onClose={handleClose}
      />
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
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.white,
    opacity: 0.85,
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
    marginTop: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 10,
    marginLeft: 2,
    marginTop: 16,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pickerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pickerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.primaryBlue}12`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pickerLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  pickerValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    maxWidth: 200,
  },
  officeList: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  officeListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  officeListItemActive: {
    backgroundColor: `${COLORS.primaryBlue}0F`,
  },
  officeListItemText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  officeListItemTextActive: {
    color: COLORS.primaryBlue,
    fontWeight: '700',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  arrowBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${COLORS.primaryBlue}0F`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  dateChipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 6,
  },
  dateChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  dateChipActive: {
    backgroundColor: COLORS.primaryBlue,
    borderColor: COLORS.primaryBlue,
  },
  dateChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  dateChipTextActive: {
    color: COLORS.white,
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeSlotWrapper: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  timeSlot: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    minWidth: '100%',
    alignItems: 'center',
  },
  timeSlotActive: {
    backgroundColor: COLORS.accentGold,
    borderColor: COLORS.accentGold,
  },
  timeSlotBooked: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  timeSlotTextActive: {
    color: COLORS.white,
  },
  timeSlotTextBooked: {
    color: COLORS.textLight,
  },
  bookedTag: {
    marginTop: 6,
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '700',
  },
  emptyAppointments: {
    marginTop: 28,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyAppointmentsText: {
    color: COLORS.textLight,
    fontSize: 14,
    lineHeight: 20,
  },
  existingSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 28,
    width: '100%',
    alignItems: 'center',
  },
  modalSuccessIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${COLORS.statusOpen}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalEmoji: {
    fontSize: 36,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 6,
  },
  modalId: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primaryBlue,
    marginBottom: 18,
  },
  modalDetails: {
    width: '100%',
    backgroundColor: COLORS.lightBackground,
    borderRadius: 14,
    padding: 16,
    marginBottom: 22,
  },
  modalDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  modalDetailLabel: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  modalDetailValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '700',
  },
});
