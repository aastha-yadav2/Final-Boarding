import React from 'react';
import { Target, CheckCircle2, AlertOctagon, TrendingUp } from 'lucide-react';
import { Milestone, Task } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { ProgressBar } from '../ui/ProgressBar';
import { calculateProgress, calculateTaskProgress } from '../../utils/time';

interface FlightMetricsProps {
  milestones: Milestone[];
  tasks: Task[];
}

export const FlightMetrics: React.FC<FlightMetricsProps> = ({ milestones, tasks }) => {
  const milestoneProgress = calculateProgress(milestones);
  const taskProgress = calculateTaskProgress(tasks);

  const completedMilestones = milestones.filter(m => m.status === 'DONE').length;
  const totalMilestones = milestones.length;

  const delayedMilestones = milestones.filter(m => m.status === 'DELAYED').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'IN PROGRESS').length;

  // Determine current flight control status
  let overallStatusText = 'ON SCHEDULE';
  let overallStatusColor = 'text-[#34C759]';
  let overallBorderColor = 'border-[#34C759]/30';

  if (milestoneProgress === 100) {
    overallStatusText = 'ALL FLIGHTS COMPLETE';
    overallStatusColor = 'text-[#30B0C7]';
    overallBorderColor = 'border-[#30B0C7]/30';
  } else if (delayedMilestones > 0) {
    overallStatusText = `${delayedMilestones} FLIGHT(S) DELAYED`;
    overallStatusColor = 'text-[#FF453A]';
    overallBorderColor = 'border-[#FF453A]/30';
  } else if (inProgressMilestones > 0) {
    overallStatusText = 'BOARDING IN PROGRESS';
    overallStatusColor = 'text-[#FFB000]';
    overallBorderColor = 'border-[#FFB000]/30';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Overall Completion Progress */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-[#8E929B] tracking-wider uppercase">
            FLIGHT PROGRESS
          </span>
          <div className="p-2 rounded-lg bg-[#FFB000]/10 text-[#FFB000]">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-display font-extrabold text-[#EDE8DC] tracking-tight">
          {milestoneProgress}%
        </div>
        <div className="mt-3">
          <ProgressBar progress={milestoneProgress} size="sm" showPercentage={false} />
        </div>
        <div className="mt-2.5 text-[11px] font-mono text-[#8E929B] flex justify-between">
          <span>{completedMilestones} of {totalMilestones} Milestones</span>
          <span className="text-[#FFB000]">Weighted Target</span>
        </div>
      </GlassCard>

      {/* 2. Milestones Clearance */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-[#8E929B] tracking-wider uppercase">
            GATE CLEARANCE
          </span>
          <div className="p-2 rounded-lg bg-[#30B0C7]/10 text-[#30B0C7]">
            <Target className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-mono font-bold text-[#EDE8DC] tracking-tight flex items-baseline gap-2">
          <span>{completedMilestones}</span>
          <span className="text-base text-[#8E929B]">/ {totalMilestones}</span>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-[#30B0C7]" />
          <span className="text-[#8E929B]">
            {totalMilestones - completedMilestones} departures remaining
          </span>
        </div>
      </GlassCard>

      {/* 3. Daily Mission Checklist */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-[#8E929B] tracking-wider uppercase">
            CREW MISSIONS
          </span>
          <div className="p-2 rounded-lg bg-[#34C759]/10 text-[#34C759]">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="text-3xl font-display font-extrabold text-[#EDE8DC] tracking-tight">
          {taskProgress}%
        </div>
        <div className="mt-3">
          <ProgressBar progress={taskProgress} size="sm" showPercentage={false} />
        </div>
        <div className="mt-2.5 text-[11px] font-mono text-[#8E929B] flex justify-between">
          <span>{tasks.filter(t => t.completed).length}/{tasks.length} Completed</span>
          <span className="text-[#34C759]">Daily Log</span>
        </div>
      </GlassCard>

      {/* 4. Flight Control Status */}
      <GlassCard className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-[#8E929B] tracking-wider uppercase">
            CONTROL STATUS
          </span>
          <div className={`p-2 rounded-lg bg-white/5 ${overallStatusColor}`}>
            <AlertOctagon className="w-4 h-4" />
          </div>
        </div>
        <div className={`text-xl font-mono font-bold tracking-wider ${overallStatusColor} truncate`}>
          {overallStatusText}
        </div>
        <div className={`mt-4 px-2.5 py-1 rounded-lg border text-[11px] font-mono inline-flex items-center gap-2 ${overallBorderColor}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          <span className="uppercase tracking-wider">
            {delayedMilestones > 0 ? 'ATTENTION REQUIRED' : 'NORMAL RADAR MONITORING'}
          </span>
        </div>
      </GlassCard>
    </div>
  );
};

