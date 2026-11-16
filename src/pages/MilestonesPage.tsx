import React, { useState } from 'react';
import { Milestone, MilestoneStatus } from '../types';
import { MilestoneTimeline } from '../components/milestones/MilestoneTimeline';
import { MilestoneCard } from '../components/milestones/MilestoneCard';
import { GlassCard } from '../components/ui/GlassCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { calculateProgress } from '../utils/time';

interface MilestonesPageProps {
  milestones: Milestone[];
  onEditMilestone: (milestone: Milestone) => void;
  onRescheduleMilestone: (milestone: Milestone) => void;
  onStatusChange: (id: string, status: MilestoneStatus) => void;
}

export const MilestonesPage: React.FC<MilestonesPageProps> = ({
  milestones,
  onEditMilestone,
  onRescheduleMilestone,
  onStatusChange,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | undefined>(milestones[0]?.id);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const progress = calculateProgress(milestones);
  const completedCount = milestones.filter(m => m.status === 'DONE').length;

  const filteredMilestones = milestones.filter((m) => {
    if (statusFilter === 'ALL') return true;
    return m.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#FFB000] uppercase font-bold flex items-center gap-2">
              <span>FLIGHT SCHEDULE CONTROL</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000]" />
              <span className="text-[#8E929B] font-normal">THE 5 GATES</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-[#EDE8DC] mt-0.5">
              Five Flight Milestones
            </h2>
            <p className="text-xs text-[#8E929B] font-mono mt-1 max-w-xl leading-relaxed">
              Every milestone represents a scheduled departure gate. Clear deliverables to keep the runway open and achieve 100% flight readiness.
            </p>
          </div>

          <div className="font-mono text-xs text-right bg-black/40 border border-white/5 p-3.5 rounded-xl shrink-0">
            <span className="text-[10px] text-[#8E929B] uppercase tracking-wider block">
              TOTAL GATES CLEARED
            </span>
            <span className="text-xl font-bold text-[#FFB000] mt-0.5 block">
              {completedCount} / {milestones.length} GATES
            </span>
          </div>
        </div>

        {/* Visual Departure Runway Timeline */}
        <div className="pt-4">
          <MilestoneTimeline
            milestones={milestones}
            activeMilestoneId={selectedMilestoneId}
            onSelectMilestone={(m) => {
              setSelectedMilestoneId(m.id);
            }}
          />
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <ProgressBar
            progress={progress}
            label="PROJECT COMPLETION VELOCITY"
            sublabel="Automatically derived from departed milestones"
            size="md"
          />
        </div>
      </GlassCard>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {['ALL', 'ON TIME', 'IN PROGRESS', 'DELAYED', 'DONE', 'REBOOKED'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg border uppercase tracking-wider text-[11px] font-semibold transition-all ${
                statusFilter === filter
                  ? 'bg-[#FFB000]/15 border-[#FFB000]/40 text-[#FFB000]'
                  : 'bg-white/5 border-white/5 text-[#8E929B] hover:text-[#EDE8DC]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[#8E929B] hidden sm:inline">
          {filteredMilestones.length} Gate(s) Displayed
        </span>
      </div>

      {/* 5 Milestone Cards Grid */}
      <div className="grid grid-cols-1 gap-5">
        {filteredMilestones.map((milestone, idx) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={idx}
            onEdit={onEditMilestone}
            onReschedule={onRescheduleMilestone}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>
    </div>
  );
};
