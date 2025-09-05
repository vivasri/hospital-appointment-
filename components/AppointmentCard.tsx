import React from 'react';
import type { Appointment } from '../types';
import { CalendarIcon, ClockIcon, StethoscopeIcon, UserIcon } from './icons';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
      <div className="bg-sky-50 p-4 border-b border-sky-100">
        <h3 className="text-xl font-bold text-sky-800">{appointment.reason}</h3>
        <p className="text-sm text-sky-600 font-medium">{appointment.department}</p>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
        <div className="flex items-center space-x-3">
          <UserIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Patient</p>
            <p>{appointment.patientName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <StethoscopeIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />
           <div className="text-sm">
            <p className="font-semibold">Doctor</p>
            <p>{appointment.doctorName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />
           <div className="text-sm">
            <p className="font-semibold">Date</p>
            <p>{new Date(appointment.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ClockIcon className="w-5 h-5 text-sky-500 flex-shrink-0" />
           <div className="text-sm">
            <p className="font-semibold">Time</p>
            <p>{appointment.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;