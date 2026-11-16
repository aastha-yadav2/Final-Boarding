import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { airportAudio } from '../../utils/sound';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'CONFIRM ACTION',
  cancelText = 'ABORT',
  variant = 'warning',
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (isOpen) {
      airportAudio.playWarningBeep();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCancel();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const getButtonStyles = () => {
    if (variant === 'danger') {
      return 'bg-[#FF453A] hover:bg-[#FF5A50] text-white shadow-[0_0_15px_rgba(255,69,58,0.3)]';
    }
    if (variant === 'warning') {
      return 'bg-[#FFB000] hover:bg-[#FFC033] text-black font-bold shadow-[0_0_15px_rgba(255,176,0,0.3)]';
    }
    return 'bg-white hover:bg-white/90 text-black font-bold';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#121418] border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#8E929B] hover:text-[#EDE8DC] p-1 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#FFB000]/10 border border-[#FFB000]/20 text-[#FFB000] shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#FFB000] uppercase">
              FLIGHT CONTROL CONFIRMATION
            </span>
            <h3 className="text-lg font-bold text-[#EDE8DC] mt-0.5 tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-[#8E929B] mt-2 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5 font-mono text-xs">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5 transition-colors font-medium tracking-wider uppercase"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              airportAudio.playFlipClick();
              onConfirm();
            }}
            className={`px-5 py-2.5 rounded-xl transition-all duration-200 tracking-wider uppercase font-semibold ${getButtonStyles()}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

