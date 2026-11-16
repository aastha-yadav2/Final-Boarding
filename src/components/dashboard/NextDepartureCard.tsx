import React from 'react';
import { ArrowUpRight, Compass, Calendar, CheckSquare, Edit3 } from 'lucide-react';
import { Milestone } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { formatAirportDate } from '../../utils/time';

interface NextDepartureCardProps {
  milestone?: Milestone;
  onSelectMilestone: (milestone: Milestone) => void;
  onGoToMilestones: () => void;
}

export const NextDepartureCard: React.FC<NextDepartureCardProps> = ({
  milestone,
  onSelectMilestone,
  onGoToMilestones,
}) => {
  if (!milestone) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center gap-3 text-[#34C759]">
          <Compass className="w-5 h-5" />
          <h3 className="text-base font-bold font-mono tracking-wider uppercase">
            ALL MILESTONES COMPLETED
          </h3>
        </div>
        <p className="text-sm text-[#8E929B] mt-2">
          Every scheduled flight has reached its destination. Prepare final submission assets.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="default" className="p-6 relative overflow-hidden group">
      {/* Accent corner tag */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 font-mono text-xs text-[#FFB000] font-semibold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-ping" />
          <span>NEXT UPCOMING DEPARTURE</span>
        </div>
        <StatusBadge status={milestone.status} size="sm" />
      </div>

      <div className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-[#FFB000] px-2 py-0.5 rounded bg-[#FFB000]/10 border border-[#FFB000]/25">
                {milestone.flightCode}
              </span>
              <span className="text-xs font-mono text-[#8E929B] tracking-wider">
                {milestone.gate} • {milestone.terminal}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#EDE8DC] mt-2 tracking-tight">
              {milestone.title}
            </h3>
            <p className="text-sm text-[#8E929B] mt-2 leading-relaxed max-w-2xl">
              {milestone.description}
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <div className="text-[10px] font-mono text-[#8E929B] uppercase tracking-wider flex items-center sm:justify-end gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>TARGET DEPARTURE</span>
            </div>
            <div className="text-sm sm:text-base font-mono font-bold text-[#EDE8DC] mt-1">
              {formatAirportDate(milestone.date)}
            </div>
          </div>
        </div>

        {/* Deliverable Callout */}
        <div className="mt-5 p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
          <CheckSquare className="w-4 h-4 text-[#FFB000] mt-0.5 shrink-0" />
          <div className="text-xs font-mono">
            <span className="text-[#8E929B] uppercase tracking-wider block">KEY DELIVERABLE:</span>
            <span className="text-[#EDE8DC] font-semibold tracking-wide">
              {milestone.deliverable}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/5 font-mono text-xs">
          <button
            onClick={() => onSelectMilestone(milestone)}
            className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#EDE8DC] border border-white/10 transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#FFB000]" />
            <span>EDIT FLIGHT DETAILS</span>
          </button>

          <button
            onClick={onGoToMilestones}
            className="text-[#FFB000] hover:text-[#FFC033] flex items-center gap-1 font-semibold tracking-wider transition-transform group-hover:translate-x-1"
          >
            <span>VIEW ALL GATES</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

