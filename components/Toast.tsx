
import React from 'react';

interface ToastProps {
  message: string;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="bg-[#2d2424] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up transition-all border border-stone-800">
      <div className="w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-xs shadow-lg shadow-orange-500/20">
        <i className="fas fa-check"></i>
      </div>
      <span className="text-sm font-bold tracking-wide">{message}</span>
    </div>
  );
};

export default Toast;
