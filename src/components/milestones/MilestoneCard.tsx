import React from 'react';
import { Calendar, CheckCircle2, AlertTriangle, Edit3, CalendarClock } from 'lucide-react';
import { Milestone, MilestoneStatus } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { formatAirportDate } from '../../utils/time';
import { airportAudio } from '../../utils/sound';

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  onEdit: (milestone: Milestone) => void;
  onReschedule: (milestone: Milestone) => void;
  onStatusChange: (id: string, status: MilestoneStatus) => void;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  milestone,
  index,
  onEdit,
  onReschedule,
  onStatusChange,
}) => {
  const isDone = milestone.status === 'DONE';
  const isDelayed = milestone.status === 'DELAYED';
  const isRebooked = milestone.status === 'REBOOKED';

  const handleToggleDone = () => {
    if (isDone) {
      onStatusChange(milestone.id, 'IN PROGRESS');
      airportAudio.playFlipClick();
    } else {
      onStatusChange(milestone.id, 'DONE');
      airportAudio.playSuccessChime();
    }
  };

  return (
    <GlassCard
      variant={isDelayed ? 'alert' : isDone ? 'default' : 'default'}
      className={`p-6 relative transition-all duration-300 ${
        isDone ? 'opacity-85 border-[#30B0C7]/20' : ''
      }`}
    >
      {/* Top Header: Flight Code, Gate, and Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/40 border border-white/10 text-xs font-mono font-bold text-[#FFB000]">
            0{index + 1}
          </div>
          <span className="font-mono text-sm font-bold text-[#EDE8DC] tracking-wider">
            {milestone.flightCode}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-xs text-[#8E929B] tracking-widest uppercase">
            {milestone.gate} • {milestone.terminal}
          </span>
        </div>

        <StatusBadge status={milestone.status} />
      </div>

      {/* Main Content */}
      <div className="py-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h3 className={`text-xl font-bold font-display tracking-tight text-[#EDE8DC] ${isDone ? 'line-through text-white/50' : ''}`}>
            {milestone.title}
          </h3>

          <div className="font-mono text-xs text-[#FFB000] flex items-center gap-1.5 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatAirportDate(milestone.date)}</span>
          </div>
        </div>

        {isRebooked && milestone.originalDate && (
          <div className="mt-1 text-[11px] font-mono text-[#BF5AF2] flex items-center gap-1">
            <span>REBOOKED FROM:</span>
            <span className="line-through">{formatAirportDate(milestone.originalDate)}</span>
          </div>
        )}

        <p className="text-sm text-[#8E929B] mt-2.5 leading-relaxed">
          {milestone.description}
        </p>

        {/* Deliverable Box */}
        <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/5">
          <div className="text-[10px] font-mono tracking-widest text-[#8E929B] uppercase">
            REQUIRED DELIVERABLE
          </div>
          <div className="text-xs font-mono font-semibold text-[#EDE8DC] mt-0.5">
            {milestone.deliverable}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        {/* Toggle Completion */}
        <button
          onClick={handleToggleDone}
          className={`px-3.5 py-2 rounded-xl border flex items-center gap-2 font-semibold transition-all ${
            isDone
              ? 'bg-[#30B0C7]/15 border-[#30B0C7]/30 text-[#30B0C7]'
              : 'bg-[#FFB000]/10 border-[#FFB000]/30 text-[#FFB000] hover:bg-[#FFB000]/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isDone ? 'MARK UNFINISHED' : 'BOARD & DEPART (DONE)'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Reschedule Button (especially prominent when delayed) */}
          <button
            onClick={() => onReschedule(milestone)}
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
              isDelayed
                ? 'bg-[#FF453A]/15 border-[#FF453A]/30 text-[#FF453A] hover:bg-[#FF453A]/25'
                : 'bg-white/5 border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/10'
            }`}
            title="Reschedule flight departure date"
          >
            <CalendarClock className="w-3.5 h-3.5" />
            <span>RESCHEDULE</span>
          </button>

          {/* Quick delay toggle if not done */}
          {!isDone && (
            <button
              onClick={() => {
                const nextStatus: MilestoneStatus = isDelayed ? 'ON TIME' : 'DELAYED';
                onStatusChange(milestone.id, nextStatus);
                if (nextStatus === 'DELAYED') airportAudio.playWarningBeep();
              }}
              className={`p-2 rounded-xl border transition-colors ${
                isDelayed
                  ? 'bg-[#FF453A]/20 text-[#FF453A] border-[#FF453A]/40'
                  : 'bg-white/5 border-white/10 text-[#8E929B] hover:text-[#FF453A] hover:border-[#FF453A]/30'
              }`}
              title={isDelayed ? 'Clear delay' : 'Flag as delayed'}
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          )}

          {/* Edit Details */}
          <button
            onClick={() => onEdit(milestone)}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/10 transition-colors"
            title="Edit milestone details"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
