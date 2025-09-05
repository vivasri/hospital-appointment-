import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { SparklesIcon } from './icons';

interface AiAssistantProps {
    onParseAppointment: (text: string) => void;
    onSummarize: () => void;
    isLoading: boolean;
    summary: string | null;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onParseAppointment, onSummarize, isLoading, summary }) => {
    const [userInput, setUserInput] = useState('');

    const handleParse = () => {
        if (!userInput.trim()) {
            alert("Please enter a request.");
            return;
        }
        onParseAppointment(userInput);
        setUserInput('');
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-3">
                <SparklesIcon className="w-8 h-8 text-sky-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">AI Assistant</h2>
            </div>
            <p className="text-slate-600 mt-2 mb-4">Use natural language to book appointments or get a summary of your schedule.</p>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="ai-input" className="block text-sm font-medium text-slate-600 mb-1">
                        Booking Request
                    </label>
                    <textarea
                        id="ai-input"
                        rows={3}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                        placeholder="e.g., 'Book a check-up with Dr. Reed for next Tuesday at 3pm for Jane Smith'"
                    />
                     <button
                        onClick={handleParse}
                        disabled={isLoading}
                        className="mt-2 w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Create with AI'}
                    </button>
                </div>
                
                <div className="border-t border-slate-200 pt-4">
                     <button
                        onClick={onSummarize}
                        disabled={isLoading}
                        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-sky-200 rounded-md shadow-sm text-sm font-medium text-sky-700 bg-sky-100 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-200 disabled:text-slate-500 transition-colors"
                    >
                        {isLoading ? <LoadingSpinner /> : 'Summarize My Schedule'}
                    </button>
                     {summary && (
                        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5 text-sky-500"/>
                                AI Summary
                            </h3>
                            <p className="text-slate-600 whitespace-pre-wrap text-sm">{summary}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiAssistant;