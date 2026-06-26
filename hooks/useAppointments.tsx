import React, {
  createContext,
  useState,
  useCallback,
  useContext,
} from 'react';
import { Appointment } from '@/types';

// Shared appointments state via context so the booking form and
// Appointments tab read/write the same list.

let idCounter = 1;

function generateId(existing: Appointment[]): string {
  let max = 0;
  for (const a of existing) {
    const match = a.id.match(/UNI-(\d+)/);
    if (match) max = Math.max(max, parseInt(match[1], 10));
  }
  idCounter = Math.max(idCounter, max + 1);
  return `UNI-${String(idCounter).padStart(3, '0')}`;
}

type AppointmentsContextValue = {
  appointments: Appointment[];
  addAppointment: (
    data: Omit<Appointment, 'id' | 'status' | 'createdAt'>,
  ) => Appointment;
  cancelAppointment: (id: string) => void;
};

const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(
  undefined,
);

export function AppointmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = useCallback(
    (data: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
      let created!: Appointment;

      setAppointments((prev) => {
        created = {
          ...data,
          id: generateId(prev),
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        };
        console.log('Appointment booked:', created);
        return [created, ...prev];
      });

      return created;
    },
    [],
  );

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    console.log('Appointment removed:', id);
  }, []);

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, cancelAppointment }}
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
