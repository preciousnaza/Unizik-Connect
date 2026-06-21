export type OfficeStatus = 'Open' | 'Busy' | 'Closed';

export interface Office {
  id: string;
  name: string;
  shortName: string;
  status: OfficeStatus;
  description: string;
  hours: string;
  location: string;
  contact: string;
  services: string[];
}

export interface Appointment {
  id: string;
  officeName: string;
  date: string;
  timeSlot: string;
  studentMatricNumber: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Student {
  name: string;
  matricNumber: string;
  faculty: string;
  department: string;
  email: string;
  level: string;
  initials: string;
}

export type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
  OfficeDetails: { officeId: string };
  AppointmentBooking: { officeId?: string };
  Assistant: undefined;
};
export type OfficesStackParamList = {
  OfficeDirectory: undefined;
  OfficeDetails: { officeId: string };
  AppointmentBooking: { officeId?: string };
  Assistant: undefined;
};
