import React from 'react';
import { PlusIcon } from './icons';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, action }) => {
  return (
    <div className="text-center py-16 px-6 bg-slate-50/50 rounded-lg border-2 border-dashed border-slate-200 animate-fadeIn">
      <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-slate-200 text-slate-500">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
      {action && (
        <div className="mt-6">
          <button
            type="button"
            onClick={action.onClick}
            className="inline-flex items-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press"
          >
            <PlusIcon />
            <span>{action.label}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
