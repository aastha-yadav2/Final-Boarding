import React from 'react';
import { Plane, Check, AlertTriangle } from 'lucide-react';
import { Milestone } from '../../types';
import { formatShortDate } from '../../utils/time';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  activeMilestoneId?: string;
  onSelectMilestone: (milestone: Milestone) => void;
}

export const MilestoneTimeline: React.FC<MilestoneTimelineProps> = ({
  milestones,
  activeMilestoneId,
  onSelectMilestone,
}) => {
  return (
    <div className="w-full py-6 overflow-x-auto no-scrollbar">
      <div className="min-w-[640px] px-4 flex items-center justify-between relative">
        {/* Background Runway Line */}
        <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0" />

        {milestones.map((m, idx) => {
          const isDone = m.status === 'DONE';
          const isDelayed = m.status === 'DELAYED';
          const isInProgress = m.status === 'IN PROGRESS';
          const isActive = activeMilestoneId === m.id;

          let nodeStyle = 'bg-[#14161B] border-white/20 text-[#8E929B]';
          if (isDone) {
            nodeStyle = 'bg-[#30B0C7] border-[#30B0C7] text-black shadow-[0_0_15px_rgba(48,176,199,0.4)]';
          } else if (isDelayed) {
            nodeStyle = 'bg-[#FF453A] border-[#FF453A] text-white shadow-[0_0_15px_rgba(255,69,58,0.4)] animate-pulse';
          } else if (isInProgress) {
            nodeStyle = 'bg-[#FFB000] border-[#FFB000] text-black shadow-[0_0_20px_rgba(255,176,0,0.5)]';
          }

          return (
            <div
              key={m.id}
              onClick={() => onSelectMilestone(m)}
              className="flex flex-col items-center relative z-10 cursor-pointer group select-none"
            >
              {/* Flight Code Tag */}
              <span className="text-[10px] font-mono font-bold text-[#8E929B] group-hover:text-[#FFB000] transition-colors mb-2">
                {m.flightCode}
              </span>

              {/* Node Circle */}
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-transform duration-300 group-hover:scale-110 ${nodeStyle} ${
                  isActive ? 'ring-4 ring-[#FFB000]/30' : ''
                }`}
              >
                {isDone ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isDelayed ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : isInProgress ? (
                  <Plane className="w-4 h-4 transform -rotate-45" />
                ) : (
                  <span>0{idx + 1}</span>
                )}
              </div>

              {/* Title & Date */}
              <div className="mt-2 text-center max-w-[110px]">
                <div className="text-xs font-mono font-bold text-[#EDE8DC] truncate group-hover:text-[#FFB000] transition-colors">
                  {m.title}
                </div>
                <div className="text-[10px] font-mono text-[#8E929B] mt-0.5">
                  {formatShortDate(m.date)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
