import React from 'react';
import { X, Trash2 } from 'lucide-react';

interface Job {
  id: number;
  name: string;
  command: string;
}

interface ManageJobsModalProps {
  jobs: Job[];
  onClose: () => void;
  onDelete: (id: number) => void;
}

const ManageJobsModal: React.FC<ManageJobsModalProps> = ({ jobs, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md border border-[#2A2A2A]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Jobs</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#2A2A2A] rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {jobs.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No jobs added yet</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-md group"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{job.name}</h3>
                  <p className="text-xs text-gray-400 truncate">{job.command}</p>
                </div>
                <button
                  onClick={() => onDelete(job.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-[#2A2A2A] hover:bg-[#333333]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageJobsModal;