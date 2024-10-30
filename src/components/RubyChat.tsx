import React, { useState, useEffect, useRef } from 'react';
import { Mic, Gem } from 'lucide-react';
import JobControls from './JobControls';

interface RubyChatProps {
  accentColor: string;
  onSettingsClick: () => void;
}

const RubyChat: React.FC<RubyChatProps> = ({ accentColor, onSettingsClick }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [jobs, setJobs] = useState<Array<{ id: number; name: string; command: string }>>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    setIsRecording(!isRecording);
  };

  const startRecording = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message.content }]);
    } catch (error) {
      console.error('Error connecting to Ollama:', error);
    }
  };

  const handleAddJob = (job: { name: string; command: string }) => {
    setJobs(prev => [...prev, { ...job, id: Date.now() }]);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Gem className="w-4 h-4 text-[#B63163]" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Ruby..."
          className="w-full pl-10 pr-10 py-2.5 bg-[#1A1A1A] rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#B63163] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
        />
        <button
          type="button"
          onClick={toggleRecording}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
            isRecording ? 'text-[#B63163] bg-[#B63163]/10' : 'text-gray-400 hover:text-[#B63163] hover:bg-[#B63163]/10'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
      </form>

      <JobControls 
        onSettingsClick={onSettingsClick}
        onAddJob={handleAddJob}
      />

      {messages.length > 0 && (
        <div className="space-y-3 mt-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-md ${
                message.role === 'user' 
                  ? 'bg-[#2A2A2A] ml-8' 
                  : 'bg-[#1A1A1A] mr-8 border border-[#2A2A2A]'
              }`}
            >
              <p className="text-sm text-gray-200">{message.content}</p>
            </div>
          ))}
        </div>
      )}

      {jobs.length > 0 && (
        <div className="space-y-2 mt-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-md bg-[#2A2A2A] hover:bg-[#333333] transition-colors cursor-pointer"
              onClick={() => {
                // Execute job command
                console.log(`Executing: ${job.command}`);
              }}
            >
              <h3 className="text-sm font-medium">{job.name}</h3>
              <p className="text-xs text-gray-400">{job.command}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RubyChat;