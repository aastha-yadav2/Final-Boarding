import React, { useState } from 'react';
import { ArrowRight, ShieldAlert, CheckSquare, Maximize2, Minimize2 } from 'lucide-react';
import { Milestone, ProjectSettings, Task } from '../types';
import { IconicDepartureBoard } from '../components/board/IconicDepartureBoard';
import { FlightMetrics } from '../components/dashboard/FlightMetrics';
import { airportAudio } from '../utils/sound';

interface FlightDashboardProps {
  settings: ProjectSettings;
  milestones: Milestone[];
  tasks: Task[];
  onSelectMilestone: (milestone: Milestone) => void;
  onGoToMilestones: () => void;
  onGoToMissions: () => void;
  onGoToRecovery: () => void;
  onOpenSettings: () => void;
}

export const FlightDashboard: React.FC<FlightDashboardProps> = ({
  settings,
  milestones,
  tasks,
  onSelectMilestone,
  onGoToMilestones,
  onGoToMissions,
  onGoToRecovery,
  onOpenSettings,
}) => {
  const [wallpaperMode, setWallpaperMode] = useState(false);
  const delayedCount = milestones.filter((m) => m.status === 'DELAYED').length;
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const toggleWallpaperMode = () => {
    airportAudio.playFlipClick();
    setWallpaperMode(!wallpaperMode);
  };

  return (
    <div className="space-y-8">
      {/* Delayed Flight Banner Alert if any exist */}
      {delayedCount > 0 && !wallpaperMode && (
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

      {/* Control Strip for Mode Toggles */}
      <div className="flex items-center justify-between gap-3 text-xs font-mono text-[#8E929B] px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#52C41A] animate-pulse" />
          <span className="tracking-widest uppercase text-[#EDE8DC]">DEPARTURE BOARD LIVE</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleWallpaperMode}
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-mono tracking-wider transition-all ${
              wallpaperMode
                ? 'bg-[#F5A623] text-black border-[#F5A623] font-bold shadow-[0_0_15px_rgba(245,166,35,0.4)]'
                : 'bg-white/5 border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/10'
            }`}
            title="Toggle minimal 1:1 wallpaper lock-screen mode"
          >
            {wallpaperMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{wallpaperMode ? 'SHOW CONTROLS' : 'LOCK-SCREEN MODE'}</span>
          </button>
        </div>
      </div>

      {/* THE ICONIC DEPARTURE BOARD HERO (Matches the reference 1:1) */}
      <div className="relative rounded-3xl border border-white/[0.08] bg-[#0A0B0D] p-2 sm:p-6 shadow-2xl overflow-hidden">
        <IconicDepartureBoard
          settings={settings}
          milestones={milestones}
          onSelectMilestone={onSelectMilestone}
          onOpenSettings={onOpenSettings}
        />
      </div>

      {/* Secondary Telemetry & Fast Directives (Hidden in pure wallpaper mode) */}
      {!wallpaperMode && (
        <div className="space-y-6 pt-4">
          {/* Quick Mission Dispatch Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#14161B]/80 border border-white/[0.08] font-mono text-xs">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-4 h-4 text-[#F5A623]" />
              <span className="text-[#8E929B]">
                CREW DIRECTIVES: <strong className="text-[#EDE8DC]">{pendingTasksCount}</strong> mission(s) pending for today's flight plan.
              </span>
            </div>
            <button
              onClick={onGoToMissions}
              className="text-[#F5A623] hover:text-[#FFC033] font-semibold flex items-center gap-1.5 uppercase tracking-wider transition-transform hover:translate-x-1 self-start sm:self-auto"
            >
              <span>Open Crew Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Full Flight Telemetry Metrics Grid */}
          <FlightMetrics milestones={milestones} tasks={tasks} />

          {/* Gate Timeline Action Link */}
          <div className="flex items-center justify-between p-5 rounded-2xl bg-[#121418] border border-white/5 font-mono text-xs">
            <div>
              <div className="text-sm font-bold text-[#EDE8DC] uppercase font-condensed tracking-wider">
                Looking for the interactive runway timeline & gate deliverables?
              </div>
              <div className="text-[#8E929B] text-[11px] mt-0.5">
                Switch to the Flight Board view to inspect full criteria and deliverable specs for each gate.
              </div>
            </div>
            <button
              onClick={onGoToMilestones}
              className="px-4 py-2 rounded-xl bg-[#F5A623]/15 text-[#F5A623] border border-[#F5A623]/30 hover:bg-[#F5A623]/25 font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0"
            >
              <span>Full Flight Board</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
