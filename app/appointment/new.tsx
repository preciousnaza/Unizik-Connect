import React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Colors,
  Radius,
  Spacing,
  Typography,
  CardShadow,
} from '@/constants/theme';
import { offices, timeSlots } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/hooks/useAppointments';
import { CustomButton } from '@/components/CustomButton';
import {
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Clock,
  X,
} from 'lucide-react-native';

// Appointment request form — presented as a modal.
// Collects student info, office, date, time, and reason, then shows a
// success modal with the generated appointment ID.

function getTodayStart(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewAppointmentScreen() {
  // If navigated from an office detail page, the office name is pre-filled.
  const { office: preselectedOffice } = useLocalSearchParams<{
    office?: string;
  }>();
  const { user, loading } = useAuth();
  const { addAppointment } = useAppointments();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [officeName, setOfficeName] = useState(preselectedOffice || '');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDateValue, setSelectedDateValue] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [showOfficePicker, setShowOfficePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');
  const [error, setError] = useState('');

  // Only offices that are not closed can be booked.
  const bookableOffices = offices.filter((o) => o.status !== 'closed');
  const upcomingDates = React.useMemo(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    startDate.setHours(0, 0, 0, 0);

    return Array.from({ length: 30 }, (_, index) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + index);
      return date;
    });
  }, []);

  // Populate from session user when available
  React.useEffect(() => {
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const resetForm = () => {
    setOfficeName(preselectedOffice || '');
    setSelectedDate(null);
    setSelectedDateValue(null);
    setTime('');
    setReason('');
    setConfirmationId('');
    setError('');
    if (user) {
      setFullName(user.name || '');
      setEmail(user.email || '');
    }
  };

  const showRequiredFieldsAlert = () => {
    const message = 'Please complete all required fields.';
    setError(message);
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('', message);
    }
  };

  const showDateRequiredAlert = () => {
    const message = 'Please select an appointment date.';
    setError(message);
    if (Platform.OS === 'web') {
      window.alert(message);
    } else {
      Alert.alert('', message);
    }
  };

  const handleSubmit = () => {
    const today = getTodayStart();

    if (!selectedDateValue || selectedDateValue < today) {
      showDateRequiredAlert();
      return;
    }

    if (!officeName || !time || !reason.trim()) {
      showRequiredFieldsAlert();
      return;
    }

    setError('');

    const formattedDate = selectedDate || '';

    const appointment = addAppointment({
      fullName: fullName.trim(),
      email: email.trim(),
      officeName,
      date: formattedDate,
      time,
      reason: reason.trim(),
    });

    setConfirmationId(appointment.id);
    setShowSuccess(true);
  };

  // Protect this screen — require authentication
  if (!loading && !user) {
    router.replace('/login');
    return null;
  }

  const handleDone = () => {
    console.log('Success modal closed');
    setShowSuccess(false);
    resetForm();
    console.log('Navigating to Appointments');
    router.replace('/(tabs)/appointments');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <X size={22} color={Colors.text} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Book Appointment</Text>
        <View style={styles.closeBtnPlaceholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Student (auto-filled) */}
        <View style={styles.field}>
          <Text style={styles.label}>Student</Text>
          <View style={[styles.input, { justifyContent: 'center' }]}>
            <Text style={{ color: Colors.text }}>{fullName}</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <View style={[styles.input, { justifyContent: 'center' }]}>
            <Text style={{ color: Colors.text }}>{email}</Text>
          </View>
        </View>

        {/* Office picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Office</Text>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={() => setShowOfficePicker(true)}
          >
            <Text
              style={[
                styles.selectText,
                !officeName && styles.placeholder,
              ]}
            >
              {officeName || 'Select an office'}
            </Text>
            <ChevronLeft
              size={18}
              color={Colors.textMuted}
              strokeWidth={2}
              style={{ transform: [{ rotate: '-90deg' }] }}
            />
          </TouchableOpacity>

        
        </View>

        {/* Date picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.datePickerRow}
          >
            {upcomingDates.map((date) => {
              const isWeekendDate = date.getDay() === 0 || date.getDay() === 6;
              const isSelected =
                !!selectedDateValue &&
                selectedDateValue.getTime() === normalizeDate(date).getTime();

              return (
                <TouchableOpacity
                  key={date.toISOString()}
                  style={[
                    styles.dateCard,
                    isSelected && styles.dateCardSelected,
                    isWeekendDate && styles.dateCardDisabled,
                  ]}
                  onPress={() => {
                    if (isWeekendDate) return;
                    setSelectedDate(formatDisplayDate(date));
                    setSelectedDateValue(normalizeDate(date));
                  }}
                  disabled={isWeekendDate}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.dateCardDay,
                      isSelected && styles.dateCardTextSelected,
                      isWeekendDate && styles.dateCardTextDisabled,
                    ]}
                  >
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text
                    style={[
                      styles.dateCardNumber,
                      isSelected && styles.dateCardTextSelected,
                      isWeekendDate && styles.dateCardTextDisabled,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                  <Text
                    style={[
                      styles.dateCardMonth,
                      isSelected && styles.dateCardTextSelected,
                      isWeekendDate && styles.dateCardTextDisabled,
                    ]}
                  >
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={[styles.selectText, !time && styles.placeholder]}>
              {time || 'Select a time slot'}
            </Text>
            <Clock size={18} color={Colors.textMuted} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Reason */}
        <View style={styles.field}>
          <Text style={styles.label}>Reason For Visit</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={reason}
            onChangeText={setReason}
            placeholder="Briefly describe your reason for visiting..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.submitWrap}>
          <CustomButton title="Submit Request" onPress={handleSubmit} />
        </View>
      </ScrollView>

      {/* Office picker modal */}
      {/* <Modal visible={showOfficePicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Office</Text>
              <TouchableOpacity onPress={() => setShowOfficePicker(false)}>
                <X size={22} color={Colors.text} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.pickerList}
              keyboardShouldPersistTaps="handled"
            >
              {bookableOffices.map((office) => (
                <TouchableOpacity
                  key={office.id}
                  style={[
                    styles.pickerItem,
                    officeName === office.name && styles.pickerItemSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setOfficeName(office.name);
                    setShowOfficePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      officeName === office.name &&
                        styles.pickerItemTextSelected,
                    ]}
                  >
                    {office.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal> */}

            {/* Office picker overlay */}
      {showOfficePicker && (
        <View style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setShowOfficePicker(false)}
          />
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Office</Text>
              <TouchableOpacity onPress={() => setShowOfficePicker(false)}>
                <X size={22} color={Colors.text} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.pickerList} keyboardShouldPersistTaps="always">
              {bookableOffices.map((office) => (
                <Pressable
                  key={office.id}
                  style={({ pressed }) => [
                    styles.pickerItem,
                    officeName === office.name && styles.pickerItemSelected,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => {
                    setOfficeName(office.name);
                    setShowOfficePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.pickerItemText,
                      officeName === office.name && styles.pickerItemTextSelected,
                    ]}
                  >
                    {office.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Time slot picker modal */}
      {/* <Modal visible={showTimePicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Time Slot</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <X size={22} color={Colors.text} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeChip,
                    time === slot && styles.timeChipSelected,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    setTime(slot);
                    setShowTimePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      time === slot && styles.timeChipTextSelected,
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal> */}

            {/* Time slot picker overlay */}
      {showTimePicker && (
        <View style={[StyleSheet.absoluteFillObject, styles.modalOverlay]}>
          <Pressable
            style={StyleSheet.absoluteFillObject}
            onPress={() => setShowTimePicker(false)}
          />
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Select Time Slot</Text>
              <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                <X size={22} color={Colors.text} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <Pressable
                  key={slot}
                  style={({ pressed }) => [
                    styles.timeChip,
                    time === slot && styles.timeChipSelected,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => {
                    setTime(slot);
                    setShowTimePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      time === slot && styles.timeChipTextSelected,
                    ]}
                  >
                    {slot}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Success overlay */}
      {showSuccess && (
        <View style={[StyleSheet.absoluteFillObject, styles.successOverlay]}>
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <CheckCircle2 size={56} color={Colors.open} strokeWidth={2} />
            </View>
            <Text style={styles.successTitle}>Appointment Confirmed</Text>
            <Text style={styles.successMessage}>
              Your appointment with {officeName} has been confirmed.
            </Text>
            <View style={styles.successIdBox}>
              <Text style={styles.successIdLabel}>Appointment ID</Text>
              <Text style={styles.successIdValue}>{confirmationId}</Text>
            </View>
            <View style={styles.successDetails}>
              <View style={styles.successDetailRow}>
                <Calendar size={16} color={Colors.textMuted} strokeWidth={2} />
                <Text style={styles.successDetailText}>
                  {selectedDate || ''}
                </Text>
              </View>
              <View style={styles.successDetailRow}>
                <Clock size={16} color={Colors.textMuted} strokeWidth={2} />
                <Text style={styles.successDetailText}>{time}</Text>
              </View>
            </View>
            <View style={styles.successBtnWrap}>
              <CustomButton title="Done" onPress={handleDone} />
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnPlaceholder: {
    width: 40,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: Spacing.md,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectText: {
    fontSize: 15,
    color: Colors.text,
  },
  datePickerRow: {
    paddingVertical: Spacing.sm,
    paddingRight: Spacing.sm,
  },
  dateCard: {
    width: 76,
    height: 96,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  dateCardSelected: {
    backgroundColor: '#003B8E',
    borderColor: '#003B8E',
  },
  dateCardDisabled: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  dateCardDay: {
    fontSize: 13,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: 6,
  },
  dateCardNumber: {
    fontSize: 24,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: 6,
  },
  dateCardMonth: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  dateCardTextSelected: {
    color: Colors.white,
  },
  dateCardTextDisabled: {
    color: '#9CA3AF',
  },
  placeholder: {
    color: Colors.textMuted,
  },
  errorText: {
    fontSize: 14,
    color: Colors.closed,
    fontWeight: Typography.medium,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  submitWrap: {
    marginTop: Spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  pickerSheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    maxHeight: '70%',
    paddingBottom: Platform.OS === 'web' ? Spacing.lg : Spacing.xl,
  },
  pickerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  pickerList: {
    padding: Spacing.md,
  },
  pickerItem: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.surface,
  },
  pickerItemSelected: {
    backgroundColor: Colors.primary,
  },
  pickerItemText: {
    fontSize: 15,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
  pickerItemTextSelected: {
    color: Colors.white,
    fontWeight: Typography.bold,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  timeChip: {
    width: '23%',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  timeChipSelected: {
    backgroundColor: Colors.primary,
  },
  timeChipText: {
    fontSize: 14,
    fontWeight: Typography.medium,
    color: Colors.text,
  },
  timeChipTextSelected: {
    color: Colors.white,
    fontWeight: Typography.bold,
  },
  successCard: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '90%',
  },
  successIcon: {
    marginBottom: Spacing.md,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  successMessage: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  successIdBox: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.md,
    width: '100%',
  },
  successIdLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: Typography.bold,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  successIdValue: {
    fontSize: 24,
    fontWeight: Typography.bold,
    color: Colors.primary,
  },
  successDetails: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  successDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  successDetailText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: Typography.medium,
  },
  successBtnWrap: {
    width: '100%',
  },
});
