import React, { useState } from 'react';
import { Plus, Settings, Trash2 } from 'lucide-react';
import AddJobModal from './AddJobModal';

interface JobControlsProps {
  onSettingsClick: () => void;
  onAddJob?: (job: { name: string; command: string }) => void;
}

const JobControls: React.FC<JobControlsProps> = ({ onSettingsClick, onAddJob }) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddJob = (job: { name: string; command: string }) => {
    onAddJob?.(job);
    setShowAddModal(false);
  };

  return (
    <>
      <div className="flex items-center justify-between border-t border-b border-[#2A2A2A] bg-[#1A1A1A]">
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex-1 p-2.5 text-gray-400 hover:text-[#B63163] hover:bg-[#B63163]/5 transition-colors relative group"
          title="Add Job"
        >
          <Plus className="w-4 h-4 mx-auto" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#B63163] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
        </button>
        <button 
          onClick={onSettingsClick}
          className="flex-1 p-2.5 text-gray-400 hover:text-[#B63163] hover:bg-[#B63163]/5 transition-colors relative group border-l border-r border-[#2A2A2A]"
          title="Settings"
        >
          <Settings className="w-4 h-4 mx-auto" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#B63163] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
        </button>
        <button 
          className="flex-1 p-2.5 text-gray-400 hover:text-[#B63163] hover:bg-[#B63163]/5 transition-colors relative group"
          title="Clear Jobs"
        >
          <Trash2 className="w-4 h-4 mx-auto" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#B63163] transform scale-x-0 group-hover:scale-x-100 transition-transform" />
        </button>
      </div>

      {showAddModal && (
        <AddJobModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddJob}
        />
      )}
    </>
  );
};

export default JobControls;