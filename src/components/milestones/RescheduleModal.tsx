import React, { useState, useEffect } from 'react';
import { X, CalendarClock, Check } from 'lucide-react';
import { Milestone } from '../../types';
import { formatAirportDate, formatISODateInput } from '../../utils/time';
import { airportAudio } from '../../utils/sound';

interface RescheduleModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
  onReschedule: (id: string, newDateISO: string, reason: string) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  milestone,
  isOpen,
  onClose,
  onReschedule,
}) => {
  const [newDate, setNewDate] = useState<string>('');
  const [reason, setReason] = useState<string>('Scope re-evaluation and development buffer extension');

  useEffect(() => {
    if (milestone) {
      // Default new date +2 days from current milestone date
      const d = new Date(milestone.date);
      d.setDate(d.getDate() + 2);
      setNewDate(d.toISOString());
    }
  }, [milestone]);

  if (!isOpen || !milestone) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    airportAudio.playAnnouncementChime();
    onReschedule(milestone.id, newDate, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#121418] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8E929B] hover:text-[#EDE8DC] p-1 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 pb-6 border-b border-white/[0.08]">
          <div className="p-3 rounded-xl bg-[#BF5AF2]/15 border border-[#BF5AF2]/30 text-[#BF5AF2]">
            <CalendarClock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#BF5AF2] uppercase font-bold">
              FLIGHT REBOOKING DESK
            </span>
            <h2 className="text-xl font-display font-bold text-[#EDE8DC] mt-0.5">
              Reschedule {milestone.flightCode}: {milestone.title}
            </h2>
            <p className="text-xs text-[#8E929B] font-mono mt-1">
              Assign a new departure slot to prevent flight abandonment.
            </p>
          </div>
        </div>

        {/* Current vs New comparison */}
        <div className="my-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs space-y-3">
          <div className="flex justify-between items-center text-[#8E929B]">
            <span>CURRENT DEPARTURE:</span>
            <span className="text-[#EDE8DC] font-semibold">{formatAirportDate(milestone.date)}</span>
          </div>
          <div className="border-t border-white/5 pt-2 flex justify-between items-center">
            <span className="text-[#BF5AF2]">NEW FLIGHT STATUS:</span>
            <span className="px-2 py-0.5 rounded bg-[#BF5AF2]/15 text-[#BF5AF2] border border-[#BF5AF2]/30 font-bold uppercase text-[10px]">
              REBOOKED
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
              New Departure Date & Time
            </label>
            <input
              type="datetime-local"
              required
              value={formatISODateInput(newDate)}
              onChange={(e) => setNewDate(new Date(e.target.value).toISOString())}
              className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#BF5AF2]/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
              Rebooking Rationale / Mitigation Plan
            </label>
            <textarea
              rows={2}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for schedule revision..."
              className="w-full bg-[#181A20] border border-white/10 rounded-xl p-3 text-[#EDE8DC] focus:outline-none focus:border-[#BF5AF2]/60 transition-colors resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5 transition-colors uppercase tracking-wider font-semibold"
            >
              Abort
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#BF5AF2] hover:bg-[#CF74F6] text-black font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(191,90,242,0.3)] transition-all uppercase tracking-wider"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Rebooking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
