
export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  reason: string;
}
