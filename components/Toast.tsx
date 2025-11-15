
import React, { useEffect, useState } from 'react';
import { SuccessIcon, InfoIcon } from './icons';

interface ToastProps {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: () => void;
}

const icons = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  error: <InfoIcon />, // Placeholder for error icon
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onClose, 300); // Wait for exit animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
     setIsExiting(true);
     setTimeout(onClose, 300);
  }

  const baseClasses = "flex items-center p-4 mb-4 text-sm rounded-lg shadow-lg transition-all duration-300 transform relative overflow-hidden";
  const typeClasses = {
      success: 'bg-teal-50 text-teal-800 border-r-4 border-teal-500 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-500',
      info: 'bg-teal-50 text-teal-800 border-r-4 border-teal-500 dark:bg-teal-900/50 dark:text-teal-300 dark:border-teal-500',
      error: 'bg-red-50 text-red-800 border-r-4 border-red-500 dark:bg-red-900/50 dark:text-red-300 dark:border-red-500',
  };
  const animationClasses = isExiting ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0";

  return (
    <div 
        className={`${baseClasses} ${typeClasses[type]} ${animationClasses}`}
        role="alert"
    >
        <div className="flex-shrink-0">
            {icons[type]}
        </div>
        <div className="mx-3 font-medium">{message}</div>
        <button 
            type="button" 
            className="ms-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 rounded-lg focus:ring-2"
            onClick={handleClose}
            aria-label="Close"
        >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
         <div className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-20">
            <div 
                className="h-full bg-current" 
                style={{ animation: 'progress 4s linear forwards' }}
            ></div>
        </div>
    </div>
  );
};

export default Toast;