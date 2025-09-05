
import { GoogleGenAI, Type } from "@google/genai";
import type { Appointment } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const appointmentSchema = {
  type: Type.OBJECT,
  properties: {
    patientName: {
      type: Type.STRING,
      description: "The full name of the patient.",
    },
    doctorName: {
      type: Type.STRING,
      description: "The full name of the doctor, including title e.g., 'Dr. Evelyn Reed'.",
    },
    department: {
      type: Type.STRING,
      description: "The medical department for the appointment, e.g., 'Cardiology'.",
    },
    date: {
      type: Type.STRING,
      description: "The date of the appointment in YYYY-MM-DD format.",
    },
    time: {
      type: Type.STRING,
      description: "The time of the appointment in 24-hour HH:MM format.",
    },
    reason: {
      type: Type.STRING,
      description: "A brief reason for the visit.",
    },
  },
  required: ["doctorName", "date", "time", "department", "reason", "patientName"]
};

export const summarizeAppointments = async (appointments: Appointment[]): Promise<string> => {
  if (appointments.length === 0) {
    return "There are no appointments to summarize.";
  }
  const prompt = `
    You are a helpful hospital administrative assistant.
    Based on the following list of upcoming hospital appointments, provide a concise and helpful summary for the patient.
    - Start with a general overview (e.g., "You have X appointments coming up").
    - Highlight the very next appointment with its date, time, doctor, and reason.
    - Mention any special preparations if implied by the reason (e.g., for a 'fasting blood test', remind them to fast).
    - Keep the tone professional, clear, and reassuring.

    Here is the list of appointments in JSON format:
    ${JSON.stringify(appointments)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error summarizing appointments:", error);
    return "Sorry, I was unable to generate a summary. Please try again later.";
  }
};


export const parseNaturalLanguageAppointment = async (text: string): Promise<Partial<Appointment>> => {
    const prompt = `Parse the following text to extract hospital appointment details according to the provided schema. The current date is ${new Date().toISOString().split('T')[0]}. If the user says 'next Tuesday', figure out the correct YYYY-MM-DD date. If a patient name is not mentioned, use 'John Doe'. Here is the text: "${text}"`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: appointmentSchema,
            }
        });
        
        const jsonText = response.text.trim();
        // The response should be a valid JSON object string.
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error parsing appointment request:", error);
        throw new Error("Could not understand the appointment request. Please try phrasing it differently.");
    }
};
