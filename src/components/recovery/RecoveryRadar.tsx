import React from 'react';
import { AlertTriangle, CalendarClock, ArrowRight, CheckCircle2, Radio, CheckSquare, Zap } from 'lucide-react';
import { Milestone, Task } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { StatusBadge } from '../ui/StatusBadge';
import { formatAirportDate, isOverdue } from '../../utils/time';

interface RecoveryRadarProps {
  milestones: Milestone[];
  tasks: Task[];
  onRescheduleMilestone: (milestone: Milestone) => void;
  onSelectTask: (task: Task) => void;
  onGoToMissions: () => void;
}

export const RecoveryRadar: React.FC<RecoveryRadarProps> = ({
  milestones,
  tasks,
  onRescheduleMilestone,
  onSelectTask,
  onGoToMissions,
}) => {
  // Identify delayed milestones or overdue milestones (not done, and past date)
  const problematicMilestones = milestones.filter(
    (m) => m.status === 'DELAYED' || (m.status !== 'DONE' && isOverdue(m.date))
  );

  // Identify overdue incomplete tasks
  const overdueTasks = tasks.filter(
    (t) => !t.completed && t.dueDate && isOverdue(t.dueDate)
  );

  // Identify the highest priority actionable pending task to unblock
  const nextActionableTask = tasks.find((t) => !t.completed && t.priority === 'CRITICAL') ||
    tasks.find((t) => !t.completed);

  const hasIssues = problematicMilestones.length > 0 || overdueTasks.length > 0;

  return (
    <div className="space-y-6">
      {/* Radar Sweep & Status Banner */}
      <GlassCard
        variant={hasIssues ? 'alert' : 'amber'}
        glow={hasIssues}
        className="p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-2xl border shrink-0 ${
              hasIssues
                ? 'bg-[#FF453A]/15 border-[#FF453A]/40 text-[#FF453A]'
                : 'bg-[#34C759]/15 border-[#34C759]/40 text-[#34C759]'
            }`}>
              <Radio className="w-7 h-7 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase">
                <span className={hasIssues ? 'text-[#FF453A]' : 'text-[#34C759]'}>
                  {hasIssues ? 'RECOVERY RADAR • ALERTS DETECTED' : 'RECOVERY RADAR • ALL GATES GREEN'}
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-[#EDE8DC] mt-1">
                {hasIssues
                  ? `${problematicMilestones.length} Flight Disruption(s) Require Rebooking`
                  : 'Radar Clear: Flight Schedule Fully Synchronized'}
              </h2>
              <p className="text-sm text-[#8E929B] font-mono mt-1.5 max-w-xl leading-relaxed">
                {hasIssues
                  ? 'Missed deadlines and delayed gates are isolated below. Reschedule departure times to stabilize project flight telemetry.'
                  : 'No overdue milestones or delayed flight gates detected. Your execution pace is on track for final departure.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-xs shrink-0">
            <div>
              <div className="text-[10px] text-[#8E929B] uppercase tracking-wider">
                DELAYED GATES
              </div>
              <div className="text-2xl font-bold text-[#FF453A] mt-0.5">
                {problematicMilestones.length}
              </div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <div className="text-[10px] text-[#8E929B] uppercase tracking-wider">
                MISSED TASKS
              </div>
              <div className="text-2xl font-bold text-[#FFB000] mt-0.5">
                {overdueTasks.length}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Immediate Actionable Mission Spotlight */}
      {nextActionableTask && (
        <GlassCard variant="amber" className="p-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 font-mono text-xs text-[#FFB000] font-bold tracking-wider">
              <Zap className="w-4 h-4 text-[#FFB000] animate-bounce" />
              <span>IMMEDIATE UNBLOCKING DIRECTIVE</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FF453A]/15 text-[#FF453A] border border-[#FF453A]/30 uppercase font-bold">
              {nextActionableTask.priority}
            </span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#8E929B] uppercase tracking-wider">
                CATEGORY: {nextActionableTask.category}
              </span>
              <h3 className="text-lg font-bold text-[#EDE8DC] mt-1 font-sans">
                {nextActionableTask.title}
              </h3>
            </div>

            <button
              onClick={onGoToMissions}
              className="px-5 py-2.5 rounded-xl bg-[#FFB000] hover:bg-[#FFC033] text-black font-mono text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-[0_0_15px_rgba(255,176,0,0.2)]"
            >
              <span>Execute In Daily Missions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      )}

      {/* Disrupted Milestones Section */}
      {problematicMilestones.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-[#8E929B]">
            <span className="uppercase tracking-wider font-semibold text-[#FF453A] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Disrupted Flight Milestones Requiring Rebooking</span>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {problematicMilestones.map((m) => (
              <GlassCard key={m.id} variant="alert" className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-[#FF453A] px-2 py-0.5 rounded bg-[#FF453A]/10 border border-[#FF453A]/30">
                      {m.flightCode}
                    </span>
                    <span className="text-xs font-mono text-[#EDE8DC] font-semibold">
                      {m.title}
                    </span>
                    <StatusBadge status={m.status} size="sm" />
                  </div>

                  <p className="text-xs text-[#8E929B] font-mono mt-2">
                    {m.description}
                  </p>

                  <div className="mt-2 text-[11px] font-mono text-[#FF453A] flex items-center gap-2">
                    <span>SCHEDULED: {formatAirportDate(m.date)}</span>
                    <span>•</span>
                    <span>DELIVERABLE: {m.deliverable}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRescheduleMilestone(m)}
                  className="px-4 py-2.5 rounded-xl bg-[#BF5AF2] hover:bg-[#CF74F6] text-black font-mono text-xs font-bold flex items-center gap-2 shrink-0 self-start sm:self-auto shadow-[0_0_15px_rgba(191,90,242,0.25)] transition-all uppercase tracking-wider"
                >
                  <CalendarClock className="w-4 h-4" />
                  <span>Reschedule Flight</span>
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Overdue Tasks Section */}
      {overdueTasks.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-white/[0.08]">
          <span className="uppercase font-mono text-xs tracking-wider font-semibold text-[#FFB000] flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            <span>Overdue Mission Directives ({overdueTasks.length})</span>
          </span>

          <div className="space-y-2">
            {overdueTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="p-3.5 rounded-xl bg-black/40 border border-[#FF453A]/30 hover:border-[#FF453A]/60 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF453A] animate-ping" />
                  <span className="text-xs font-mono font-medium text-[#EDE8DC] group-hover:text-[#FFB000] transition-colors">
                    {task.title}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#FF453A] shrink-0">
                  OVERDUE
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!hasIssues && (
        <GlassCard className="p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#34C759]/10 border border-[#34C759]/20 text-[#34C759] flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-display font-bold text-[#EDE8DC]">
            No Active Disruptions
          </h3>
          <p className="text-sm text-[#8E929B] font-mono mt-2 max-w-md">
            All 5 milestones and mission directives are proceeding as planned. Keep momentum high toward the final departure deadline.
          </p>
        </GlassCard>
      )}
    </div>
  );
};
