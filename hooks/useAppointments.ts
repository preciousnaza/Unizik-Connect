import { useState, useCallback } from 'react';
import { Appointment } from '@/types';
import { sampleAppointment } from '@/data/mockData';

// useAppointments keeps appointments in component state (no backend).
// The list is seeded with the sample appointment so the Appointments tab
// isn't empty on first launch. New appointments are prepended and given
// an auto-incrementing ID like UNI-001, UNI-002, ...

let idCounter = 1;

function generateId(existing: Appointment[]): string {
  // Find the highest existing numeric suffix and increment from there.
  let max = 0;
  for (const a of existing) {
    const match = a.id.match(/UNI-(\d+)/);
    if (match) max = Math.max(max, parseInt(match[1], 10));
  }
  idCounter = Math.max(idCounter, max + 1);
  return `UNI-${String(idCounter).padStart(3, '0')}`;
}

export function useAppointments() {
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
      const newAppointment: Appointment = {
        ...data,
        id: generateId(appointments),
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      setAppointments((prev) => [newAppointment, ...prev]);
      return newAppointment;
    },
    [appointments],
  );

  return { appointments, addAppointment };
}
