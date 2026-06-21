export interface ChatKeywordResponse {
  keywords: string[];
  response: string;
}

export const CHAT_RESPONSES: ChatKeywordResponse[] = [
  {
    keywords: ['registry'],
    response:
      'The Registry is located at the Admin Block, Ground Floor. Office hours are 8 AM – 4 PM, Monday to Friday.',
  },
  {
    keywords: ['clearance'],
    response:
      'To process clearance, visit the Registry with your student ID, receipt of school fees, and departmental clearance form.',
  },
  {
    keywords: ['documents', 'document'],
    response:
      "Required documents vary by service. Commonly needed: student ID, school fees receipt, and a completed request form.",
  },
  {
    keywords: ['library'],
    response:
      'The University Library is open Monday to Friday, 8 AM – 6 PM, and Saturdays 9 AM – 3 PM.',
  },
  {
    keywords: ['student affairs', 'student affairs'],
    response:
      'Student Affairs is located at the Student Centre. Contact: +234 800 000 0003. They handle welfare, clubs, and campus activities.',
  },
  {
    keywords: ['bursary', 'fees', 'payment'],
    response:
      'The Bursary is located at the Admin Block. They handle fee payments and financial records. Visit Monday–Friday, 8 AM – 4 PM.',
  },
  {
    keywords: ['medical', 'health', 'hospital', 'clinic'],
    response:
      'The Medical Centre is open 24 hours for emergencies. Regular consultations are Monday–Friday, 8 AM – 4 PM.',
  },
  {
    keywords: ['appointment', 'book', 'booking'],
    response:
      'You can book an appointment by tapping the Appointments tab at the bottom of the screen.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings'],
    response: "Hello! 👋 I'm the UNIZIK Assistant. How can I help you today?",
  },
  {
    keywords: ['help', 'assist', 'support'],
    response:
      "I can help with information about UNIZIK offices, bookings, clearance, documents, library, bursary, and more. What do you need?",
  },
  {
    keywords: ['hod', 'department', 'head of department'],
    response:
      'The HOD Office handles departmental academic matters including advising, course registration, and departmental clearance. Visit Monday–Friday, 8 AM – 4 PM.',
  },
  {
    keywords: ['ict', 'portal', 'technical', 'login', 'password'],
    response:
      'The ICT Support Unit provides technical support for university systems and the student portal. They are located in the ICT Building and are open Monday–Friday, 9 AM – 5 PM.',
  },
  {
    keywords: ['security', 'id card', 'identification'],
    response:
      'The Security Department handles campus security and student ID card processing. Visit the Security Office at the Main Gate — open 24 hours.',
  },
  {
    keywords: ['sgs', 'general studies', 'gst'],
    response:
      'The School of General Studies (SGS) manages general university courses and examinations. Located in the SGS Building, open Monday–Friday, 8 AM – 4 PM.',
  },
  {
    keywords: ['faculty'],
    response:
      'Faculty Offices oversee faculty-level academic administration including course allocation and departmental coordination.',
  },
];

export const DEFAULT_RESPONSE =
  "I'm sorry, I don't have information on that yet. Please visit the relevant office or contact Student Affairs for assistance.";
