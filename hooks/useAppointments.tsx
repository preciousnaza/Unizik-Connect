import React, {
  createContext,
  useState,
  useCallback,
  useContext,
} from 'react';
import { Appointment } from '@/types';
import { sampleAppointment } from '@/data/mockData';

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
};

const AppointmentsContext = createContext<AppointmentsContextValue | undefined>(
  undefined,
);

export function AppointmentsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      ...sampleAppointment,
      fullName: 'Chukwuemeka Okafor',
      email: 'emeka.okafor@student.unizik.edu.ng',
      reason: 'ID Card Replacement',
      createdAt: new Date().toISOString(),
    },
  ]);

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
        console.log('Appointment created:', created);
        console.log('Appointment saved');
        return [created, ...prev];
      });

      return created;
    },
    [],
  );

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
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
