import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Appointment } from '../types';
import { SAMPLE_APPOINTMENTS } from '../data/appointments';

interface AppointmentsContextValue {
  appointments: Appointment[];
  nextAppointmentId: string;
  addAppointment: (appt: Omit<Appointment, 'id' | 'status'>) => Appointment;
  appointmentExists: (officeName: string, date: string, timeSlot: string) => boolean;
}

const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(
  undefined
);

const NEXT_APPOINTMENT_BASE = {
  upcoming: {
    id: 'UNI-001',
    officeName: 'Registry',
    date: 'Monday, July 7, 2025',
    timeSlot: '10:00 AM',
    studentMatricNumber: '2021/242810',
    status: 'Confirmed' as const,
  },
};

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    NEXT_APPOINTMENT_BASE.upcoming,
    ...SAMPLE_APPOINTMENTS,
  ]);
  const [counter, setCounter] = useState(3);

  const nextAppointmentId = `UNI-00${counter + 1}`;

  const appointmentExists = useCallback(
    (officeName: string, date: string, timeSlot: string) => {
      return appointments.some(
        (appt) =>
          appt.officeName === officeName &&
          appt.date === date &&
          appt.timeSlot === timeSlot
      );
    },
    [appointments]
  );

  const addAppointment = useCallback(
    (appt: Omit<Appointment, 'id' | 'status'>) => {
      const newCounter = counter + 1;
      const newId = `UNI-00${newCounter}`;
      const newAppointment: Appointment = {
        ...appt,
        id: newId,
        status: 'Confirmed',
      };
      setCounter(newCounter);
      setAppointments((prev) => [newAppointment, ...prev]);
      return newAppointment;
    },
    [counter]
  );

  return (
    <AppointmentsContext.Provider
      value={{ appointments, nextAppointmentId, addAppointment, appointmentExists }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentsContext);
  if (!ctx) {
    throw new Error('useAppointments must be used within AppointmentsProvider');
  }
  return ctx;
}
