import React from 'react';
import { ArrowRight, PlaneTakeoff, ShieldAlert, CheckSquare } from 'lucide-react';
import { Milestone, ProjectSettings, Task } from '../types';
import { LiveCountdown } from '../components/dashboard/LiveCountdown';
import { FlightMetrics } from '../components/dashboard/FlightMetrics';
import { NextDepartureCard } from '../components/dashboard/NextDepartureCard';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { formatAirportDate } from '../utils/time';

interface FlightDashboardProps {
  settings: ProjectSettings;
  milestones: Milestone[];
  tasks: Task[];
  onSelectMilestone: (milestone: Milestone) => void;
  onGoToMilestones: () => void;
  onGoToMissions: () => void;
  onGoToRecovery: () => void;
}

export const FlightDashboard: React.FC<FlightDashboardProps> = ({
  settings,
  milestones,
  tasks,
  onSelectMilestone,
  onGoToMilestones,
  onGoToMissions,
  onGoToRecovery,
}) => {
  // Find next upcoming milestone (first non-done milestone)
  const nextMilestone = milestones.find((m) => m.status !== 'DONE');

  const delayedCount = milestones.filter((m) => m.status === 'DELAYED').length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-6">
      {/* Delayed Flight Banner Alert if any exist */}
      {delayedCount > 0 && (
        <div
          onClick={onGoToRecovery}
          className="p-4 rounded-2xl bg-[#FF453A]/15 border border-[#FF453A]/40 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FF453A]/20 transition-all shadow-[0_0_20px_rgba(255,69,58,0.15)] animate-pulse"
        >
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-[#FF453A]" />
            <div className="font-mono text-xs">
              <span className="font-bold text-[#FF453A] uppercase tracking-wider block">
                FLIGHT RADAR ALERT: {delayedCount} GATE(S) REPORTING DELAY
              </span>
              <span className="text-[#EDE8DC] text-[11px]">
                Immediate rebooking recommended to preserve departure schedule.
              </span>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-lg bg-[#FF453A] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
            <span>Enter Recovery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Main Live Countdown Display */}
      <LiveCountdown
        deadline={settings.deadline}
        projectName={settings.projectName}
        eventName={settings.eventName}
      />

      {/* 2. Flight Telemetry Metrics Grid */}
      <FlightMetrics milestones={milestones} tasks={tasks} />

      {/* Quick Mission Dispatch Link */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#14161B]/80 border border-white/[0.08] font-mono text-xs">
        <div className="flex items-center gap-3">
          <CheckSquare className="w-4 h-4 text-[#FFB000]" />
          <span className="text-[#8E929B]">
            CREW DIRECTIVES: <strong className="text-[#EDE8DC]">{pendingTasksCount}</strong> mission(s) pending for today's flight plan.
          </span>
        </div>
        <button
          onClick={onGoToMissions}
          className="text-[#FFB000] hover:text-[#FFC033] font-semibold flex items-center gap-1.5 uppercase tracking-wider transition-transform hover:translate-x-1"
        >
          <span>Open Crew Checklist</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Next Upcoming Departure Spotlight */}
      <NextDepartureCard
        milestone={nextMilestone}
        onSelectMilestone={onSelectMilestone}
        onGoToMilestones={onGoToMilestones}
      />

      {/* 4. Departure Gate Schedule Snapshot (The Flight Board) */}
      <GlassCard className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <PlaneTakeoff className="w-5 h-5 text-[#FFB000]" />
            <h3 className="text-lg font-bold font-display text-[#EDE8DC] tracking-wide uppercase">
              Gate Departure Board (All 5 Flights)
            </h3>
          </div>

          <button
            onClick={onGoToMilestones}
            className="text-xs font-mono text-[#FFB000] hover:text-[#FFC033] flex items-center gap-1.5 transition-transform hover:translate-x-1"
          >
            <span>FULL DEPARTURE TIMELINE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Departure Table */}
        <div className="divide-y divide-white/[0.06] overflow-x-auto">
          {milestones.map((m, idx) => (
            <div
              key={m.id}
              onClick={() => onSelectMilestone(m)}
              className="py-3.5 px-2 flex items-center justify-between gap-4 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer group select-none"
            >
              {/* Flight & Gate */}
              <div className="flex items-center gap-3 min-w-[140px]">
                <span className="w-6 h-6 rounded bg-black/40 border border-white/10 flex items-center justify-center text-[10px] font-mono font-bold text-[#FFB000]">
                  0{idx + 1}
                </span>
                <div>
                  <div className="text-xs font-mono font-bold text-[#EDE8DC] group-hover:text-[#FFB000] transition-colors">
                    {m.flightCode}
                  </div>
                  <div className="text-[10px] font-mono text-[#8E929B]">
                    {m.gate} • {m.terminal}
                  </div>
                </div>
              </div>

              {/* Title & Deliverable */}
              <div className="hidden md:block flex-1 min-w-0 pr-4">
                <div className="text-xs font-semibold text-[#EDE8DC] truncate">
                  {m.title}
                </div>
                <div className="text-[11px] font-mono text-[#8E929B] truncate">
                  {m.deliverable}
                </div>
              </div>

              {/* Departure Time */}
              <div className="font-mono text-xs text-[#EDE8DC] text-right shrink-0">
                <div>{formatAirportDate(m.date)}</div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <StatusBadge status={m.status} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

