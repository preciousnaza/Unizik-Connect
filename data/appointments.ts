import { Appointment } from '../types';

export const SAMPLE_APPOINTMENTS: Appointment[] = [
  {
    id: 'UNI-002',
    officeName: 'Student Affairs',
    date: 'Wednesday, July 9, 2025',
    timeSlot: '11:00 AM',
    studentMatricNumber: '2021/242810',
    status: 'Confirmed',
  },
  {
    id: 'UNI-003',
    officeName: 'Bursary',
    date: 'Thursday, July 10, 2025',
    timeSlot: '2:00 PM',
    studentMatricNumber: '2021/242811',
    status: 'Pending',
  },
];
