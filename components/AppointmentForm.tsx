import React, { useState, useEffect } from 'react';
import type { Appointment } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface AppointmentFormProps {
  onAddAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  initialData?: Partial<Appointment> | null;
  isLoading: boolean;
}

const emptyFormState = {
  patientName: 'Jane Smith',
  doctorName: '',
  department: '',
  date: '',
  time: '',
  reason: '',
};

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onAddAppointment, initialData, isLoading }) => {
  const [formData, setFormData] = useState<Omit<Appointment, 'id'>>(emptyFormState);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(formData).some(val => val === '')) {
        alert("Please fill in all fields.");
        return;
    }
    onAddAppointment(formData);
    setFormData(emptyFormState);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patientName" className="block text-sm font-medium text-slate-600 mb-1">Patient Name</label>
          <input type="text" name="patientName" id="patientName" value={formData.patientName} onChange={handleChange} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="doctorName" className="block text-sm font-medium text-slate-600 mb-1">Doctor's Name</label>
          <input type="text" name="doctorName" id="doctorName" value={formData.doctorName} onChange={handleChange} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-600 mb-1">Department</label>
          <input type="text" name="department" id="department" value={formData.department} onChange={handleChange} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-600 mb-1">Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-600 mb-1">Time</label>
                <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
            </div>
        </div>
        <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-600 mb-1">Reason for Visit</label>
            <input type="text" name="reason" id="reason" value={formData.reason} onChange={handleChange} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition" />
        </div>
        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105">
           {isLoading ? <LoadingSpinner /> : 'Add Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;