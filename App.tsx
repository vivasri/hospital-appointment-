import React, { useState, useCallback } from 'react';
import type { Appointment } from './types';
import { summarizeAppointments, parseNaturalLanguageAppointment } from './services/geminiService';
import AppointmentCard from './components/AppointmentCard';
import AppointmentForm from './components/AppointmentForm';
import AiAssistant from './components/AiAssistant';
import { HospitalIcon } from './components/icons';

const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    doctorName: 'Dr. Evelyn Reed',
    department: 'Cardiology',
    date: '2024-08-15',
    time: '10:00',
    reason: 'Annual Check-up',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Alan Grant',
    department: 'Orthopedics',
    date: '2024-08-18',
    time: '14:30',
    reason: 'Follow-up on knee injury',
  },
];


const App: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [formInitialData, setFormInitialData] = useState<Partial<Appointment> | null>(null);

  const handleSummarize = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAiSummary(null);
    try {
      const summary = await summarizeAppointments(appointments);
      setAiSummary(summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [appointments]);

  const handleParseAppointment = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    setFormInitialData(null);
    try {
      const parsedData = await parseNaturalLanguageAppointment(text);
      setFormInitialData(parsedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAppointment = (newAppointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...newAppointmentData,
      id: new Date().toISOString(),
    };
    setAppointments(prev => [...prev, newAppointment].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setFormInitialData(null); // Clear form after successful submission
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <HospitalIcon className="w-8 h-8 text-sky-500" />
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              Aether Health
            </h1>
            <p className="text-slate-500 text-sm -mt-1">Your intelligent assistant for seamless scheduling.</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg relative mb-6 shadow-md" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 flex flex-col gap-8 sticky top-24">
            <AiAssistant 
                onParseAppointment={handleParseAppointment} 
                onSummarize={handleSummarize}
                isLoading={isLoading}
                summary={aiSummary}
            />
            <AppointmentForm 
              onAddAppointment={addAppointment} 
              initialData={formInitialData} 
              isLoading={isLoading} 
            />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Upcoming Appointments</h2>
            {appointments.length > 0 ? (
                <div className="space-y-6">
                {appointments.map(app => (
                    <AppointmentCard key={app.id} appointment={app} />
                ))}
                </div>
            ) : (
                <div className="bg-white text-center p-10 rounded-xl shadow-lg">
                    <p className="text-slate-500">No upcoming appointments scheduled.</p>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;