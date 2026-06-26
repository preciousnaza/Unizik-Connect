// Core domain types used across the app.
// Keeping these in one place makes the data shapes easy to discover.

export type OfficeStatus = 'open' | 'busy' | 'closed';

export type AppointmentStatus = 'confirmed' | 'pending';

// A university office listed in the directory.
export interface Office {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  location: string;
  openingHours: string;
  contact: string;
  status: OfficeStatus;
  services: string[];
  icon: string; // lucide icon name
}

// An appointment a student requests with an office.
export interface Appointment {
  id: string; // e.g. UNI-001
  fullName: string;
  email: string;
  officeName: string;
  date: string; // ISO-ish display string
  time: string; // e.g. "10:00 AM"
  reason: string;
  status: AppointmentStatus;
  createdAt: string;
}

// A single message in the assistant chat.
export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

// Mock student profile shown on the Profile tab.
export interface StudentProfile {
  name: string;
  matricNumber: string;
  faculty: string;
  department: string;
  email: string;
  level: string;
  avatar: string;
}

// A keyword-matching rule for the assistant.
export interface ChatRule {
  keywords: string[];
  response: string;
}
