import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AddJobModalProps {
  onClose: () => void;
  onAdd: (job: { name: string; command: string }) => void;
}

const AddJobModal: React.FC<AddJobModalProps> = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [command, setCommand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && command) {
      onAdd({ name, command });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md border border-[#2A2A2A]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Job</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2A2A2A] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Job Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] rounded-md border border-[#3A3A3A] focus:border-[#B63163] focus:ring-1 focus:ring-[#B63163] outline-none"
              placeholder="e.g., Update System"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Command
            </label>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="w-full px-3 py-2 bg-[#2A2A2A] rounded-md border border-[#3A3A3A] focus:border-[#B63163] focus:ring-1 focus:ring-[#B63163] outline-none"
              placeholder="e.g., sudo apt update"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-[#2A2A2A] hover:bg-[#333333]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-[#B63163] hover:bg-[#A12952]"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;