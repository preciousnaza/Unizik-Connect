import { Office, StudentProfile, ChatRule } from '@/types';

// All ten university offices. `status` drives the badge color and whether
// the "Book Appointment" button appears on the details screen.
export const offices: Office[] = [
  {
    id: 'registry',
    name: 'Registry',
    shortDescription: 'Student records, transcripts & clearance.',
    description:
      'The Registry handles all official student records including admissions, transcripts, clearance, and certification of documents.',
    location: 'Administrative Block, Room 101, Main Campus, Awka',
    openingHours: 'Mon – Fri: 8:00 AM – 4:00 PM',
    contact: '+234 803 000 0001',
    status: 'open',
    services: [
      'Student clearance processing',
      'Transcript requests',
      'Certificate verification',
      'Result processing',
      'File management',
    ],
    icon: 'FileText',
  },
  {
    id: 'bursary',
    name: 'Bursary',
    shortDescription: 'School fees, payments & receipts.',
    description:
      'The Bursary Department manages all financial transactions including school fees payment, receipts, and payment verification.',
    location: 'Administrative Block, Room 105, Main Campus, Awka',
    openingHours: 'Mon – Fri: 8:00 AM – 3:00 PM',
    contact: '+234 803 000 0002',
    status: 'busy',
    services: [
      'School fees payment',
      'Payment receipts',
      'Fee verification',
      'Refund processing',
      'Financial clearance',
    ],
    icon: 'Wallet',
  },
  {
    id: 'student-affairs',
    name: 'Student Affairs',
    shortDescription: 'Welfare, ID cards & student support.',
    description:
      'The Student Affairs Division oversees student welfare, ID card issuance, disciplinary matters, and general student support services.',
    location: 'Student Affairs Building, Main Campus, Awka',
    openingHours: 'Mon – Fri: 8:00 AM – 4:00 PM',
    contact: '+234 803 000 0003',
    status: 'open',
    services: [
      'Student ID card issuance',
      'Lost ID replacement',
      'Welfare support',
      'Student complaints',
      'Hostel allocation support',
    ],
    icon: 'Users',
  },
  {
    id: 'library',
    name: 'University Library',
    shortDescription: 'Books, e-resources & study spaces.',
    description:
      'The University Library provides access to books, journals, e-resources, and quiet study spaces for all students and staff.',
    location: 'Library Complex, Main Campus, Awka',
    openingHours: 'Mon – Sat: 8:00 AM – 9:00 PM',
    contact: '+234 803 000 0004',
    status: 'busy',
    services: [
      'Book borrowing',
      'E-resource access',
      'Study space booking',
      'Research assistance',
      'Library registration',
    ],
    icon: 'BookOpen',
  },
  {
    id: 'general-studies',
    name: 'School of General Studies',
    shortDescription: 'GST courses & general education.',
    description:
      'The School of General Studies coordinates all GST (General Studies) courses including communication, philosophy, and Nigerian peoples and culture.',
    location: 'GST Building, Main Campus, Awka',
    openingHours: 'Mon – Fri: 8:00 AM – 4:00 PM',
    contact: '+234 803 000 0005',
    status: 'open',
    services: [
      'GST course registration',
      'GST result inquiries',
      'General studies materials',
      'GST examinations',
    ],
    icon: 'GraduationCap',
  },
  {
    id: 'faculty-office',
    name: 'Faculty Office',
    shortDescription: 'Faculty-level records & coordination.',
    description:
      'The Faculty Office manages faculty-level academic records, course coordination, and inter-departmental matters.',
    location: 'Faculty Building, Main Campus, Awka',
    openingHours: 'Mon – Fri: 8:00 AM – 4:00 PM',
    contact: '+234 803 000 0006',
    status: 'open',
    services: [
      'Faculty records',
      'Course allocation',
      'Departmental coordination',
      'Faculty events',
    ],
    icon: 'Building2',
  },
  {
    id: 'hod-office',
    name: 'Department / HOD Office',
    shortDescription: 'Departmental matters & academic advice.',
    description:
      'The Head of Department office handles departmental academic matters, student advising, course registration, and departmental clearance.',
    location: 'Department Block, Main Campus, Awka',
    openingHours: 'Mon – Fri: 9:00 AM – 3:00 PM',
    contact: '+234 803 000 0007',
    status: 'busy',
    services: [
      'Academic advising',
      'Course registration',
      'Departmental clearance',
      'Result complaints',
      'Lecturer consultation',
    ],
    icon: 'UserCog',
  },
  {
    id: 'medical-centre',
    name: 'Medical Centre',
    shortDescription: 'Student health & medical services.',
    description:
      'The University Medical Centre provides primary healthcare, medical check-ups, and emergency services to students and staff.',
    location: 'Medical Centre, Main Campus, Awka',
    openingHours: 'Mon – Sun: 24 Hours',
    contact: '+234 803 000 0008',
    status: 'open',
    services: [
      'General consultation',
      'Emergency care',
      'Medical reports',
      'Vaccination',
      'Health insurance support',
    ],
    icon: 'HeartPulse',
  },
  {
    id: 'ict-support',
    name: 'ICT Support Unit',
    shortDescription: 'Tech support & portal access.',
    description:
      'The ICT Support Unit handles student portal access, email setup, Wi-Fi connectivity, and general technical support.',
    location: 'ICT Building, Main Campus, Awka',
    openingHours: 'Mon – Fri: 8:00 AM – 5:00 PM',
    contact: '+234 803 000 0009',
    status: 'open',
    services: [
      'Portal access support',
      'Student email setup',
      'Wi-Fi connectivity',
      'Result upload issues',
      'General tech support',
    ],
    icon: 'MonitorCog',
  },
  {
    id: 'security',
    name: 'Security Department',
    shortDescription: 'Campus safety & security.',
    description:
      'The Security Department ensures the safety of students, staff, and university property across all campuses.',
    location: 'Security Office, Main Gate, Main Campus, Awka',
    openingHours: 'Mon – Sun: 24 Hours',
    contact: '+234 803 000 0010',
    status: 'closed',
    services: [
      'Campus security',
      'Lost & found',
      'Emergency response',
      'Parking permits',
      'Security clearance',
    ],
    icon: 'ShieldCheck',
  },
];

// Sample appointment shown on the Home screen "Upcoming Appointment" card.
export const sampleAppointment = {
  id: 'UNI-001',
  officeName: 'Student Affairs',
  date: '2026-06-25',
  time: '10:00 AM',
  reason: 'ID Card Replacement',
  status: 'confirmed' as const,
};

// Available time slots for the appointment form.
export const timeSlots = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
];

// Mock student profile (no auth — purely for display).
export const studentProfile: StudentProfile = {
  name: 'Chukwuemeka Okafor',
  matricNumber: 'UNIZIK/2023/123456',
  faculty: 'Faculty of Engineering',
  department: 'Electrical Engineering',
  email: 'emeka.okafor@student.unizik.edu.ng',
  level: '300 Level',
  avatar: 'CO',
};

// Keyword-matching rules for the assistant.
// The first rule whose keywords all appear in the user's message wins.
// A fallback is used when nothing matches.
export const chatRules: ChatRule[] = [
  {
    keywords: ['registry'],
    response:
      "The Registry is located in the Administrative Block, Room 101, Main Campus, Awka. It's open Monday to Friday, 8:00 AM – 4:00 PM. They handle student clearance, transcripts, and certificate verification.",
  },
  {
    keywords: ['clearance'],
    response:
      'To process clearance, visit the Registry with your original credentials, school fees receipt, and departmental clearance form. Clearance runs Monday to Friday, 8:00 AM – 4:00 PM.',
  },
  {
    keywords: ['id', 'card'],
    response:
      'For a lost or new ID card, visit Student Affairs with one passport photograph and a valid identification document. Replacement takes about 2–3 working days.',
  },
  {
    keywords: ['documents', 'required'],
    response:
      'Commonly required documents include: admission letter, school fees receipt, O\u2019level results, birth certificate/age declaration, and passport photographs. Check with the specific office for any extras.',
  },
  {
    keywords: ['student', 'affairs'],
    response:
      'Student Affairs is in the Student Affairs Building, Main Campus. They handle ID cards, welfare, complaints, and hostel matters. Contact: +234 803 000 0003.',
  },
  {
    keywords: ['library', 'hours'],
    response:
      'The University Library is open Monday to Saturday, 8:00 AM – 9:00 PM. You can borrow books, access e-resources, and book study spaces.',
  },
  {
    keywords: ['transcript'],
    response:
      'To request a transcript, visit the Registry or apply through the student portal. You\u2019ll need your matric number, a payment receipt, and the destination address. Processing takes 2–4 weeks.',
  },
  {
    keywords: ['bursary', 'fees', 'payment'],
    response:
      'The Bursary handles school fees and payments. It\u2019s in the Administrative Block, Room 105. Always keep your payment receipt — you\u2019ll need it for clearance and records.',
  },
  {
    keywords: ['medical', 'health'],
    response:
      'The Medical Centre is open 24 hours daily for consultations and emergencies. It\u2019s located on the Main Campus. Carry your student ID when visiting.',
  },
  {
    keywords: ['ict', 'portal', 'email', 'wifi'],
    response:
      'The ICT Support Unit (ICT Building) helps with portal access, student email setup, and Wi-Fi. They\u2019re open Mon–Fri, 8:00 AM – 5:00 PM. Contact: +234 803 000 0009.',
  },
  {
    keywords: ['hod', 'department'],
    response:
      'Your HOD\u2019s office handles academic advising, course registration, and departmental clearance. Visit during 9:00 AM – 3:00 PM, Mon–Fri. You can also book an appointment through this app.',
  },
  {
    keywords: ['appointment', 'book'],
    response:
      'You can book an appointment with any open office through the Appointments tab. Pick an office, choose a date and time slot, and submit — you\u2019ll get a confirmation ID instantly.',
  },
  {
    keywords: ['hello', 'hi', 'hey'],
    response:
      "Hello! I\u2019m the UNIZIK Connect Assistant. Ask me about offices, clearance, transcripts, ID cards, library hours, and more. How can I help?",
  },
];

export const assistantFallback =
  "I\u2019m not sure about that yet, but I can help with offices, clearance, transcripts, ID cards, library hours, and appointments. Try asking about one of those!";

// Suggested questions shown as chips above the chat input.
export const suggestedQuestions = [
  'Where is the Registry?',
  'How do I process clearance?',
  'I lost my ID card',
  'What documents are required?',
  'How do I contact Student Affairs?',
  'What are library opening hours?',
  'How do I request a transcript?',
];
