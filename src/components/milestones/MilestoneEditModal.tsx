import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Compass, FileText } from 'lucide-react';
import { Milestone, MilestoneStatus } from '../../types';
import { formatISODateInput } from '../../utils/time';
import { airportAudio } from '../../utils/sound';

interface MilestoneEditModalProps {
  milestone: Milestone | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Milestone) => void;
}

export const MilestoneEditModal: React.FC<MilestoneEditModalProps> = ({
  milestone,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Milestone | null>(null);

  useEffect(() => {
    if (milestone) {
      setFormData({ ...milestone });
    }
  }, [milestone]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    airportAudio.playFlipClick();
    onSave(formData);
    onClose();
  };

  const statuses: MilestoneStatus[] = ['ON TIME', 'IN PROGRESS', 'DELAYED', 'DONE', 'REBOOKED'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#121418] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
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
        <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08]">
          <div className="p-3 rounded-xl bg-[#FFB000]/10 border border-[#FFB000]/25 text-[#FFB000]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#FFB000] uppercase font-bold">
              FLIGHT CONTROL LOG • GATE MODIFICATION
            </div>
            <h2 className="text-xl font-display font-bold text-[#EDE8DC] mt-0.5">
              Edit Milestone {formData.flightCode}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5 font-mono text-xs">
          {/* Title & Flight Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Flight Milestone Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Callsign / Code
              </label>
              <input
                type="text"
                required
                value={formData.flightCode}
                onChange={(e) => setFormData({ ...formData, flightCode: e.target.value })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors uppercase"
              />
            </div>
          </div>

          {/* Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>Scheduled Departure (Date & Time)</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formatISODateInput(formData.date)}
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Gate Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as MilestoneStatus })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              >
                {statuses.map((st) => (
                  <option key={st} value={st} className="bg-[#121418] text-[#EDE8DC]">
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gate & Terminal */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Assigned Gate
              </label>
              <input
                type="text"
                value={formData.gate}
                onChange={(e) => setFormData({ ...formData, gate: e.target.value })}
                placeholder="Gate A-01"
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Terminal
              </label>
              <input
                type="text"
                value={formData.terminal}
                onChange={(e) => setFormData({ ...formData, terminal: e.target.value })}
                placeholder="T1"
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
              Mission Description & Objectives
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#181A20] border border-white/10 rounded-xl p-3 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Key Deliverable */}
          <div>
            <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>Mandatory Proof / Deliverable</span>
            </label>
            <input
              type="text"
              required
              value={formData.deliverable}
              onChange={(e) => setFormData({ ...formData, deliverable: e.target.value })}
              placeholder="e.g. Project Charter & Scope Document"
              className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5 transition-colors uppercase tracking-wider font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FFB000] hover:bg-[#FFC033] text-black font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,176,0,0.3)] transition-all uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
