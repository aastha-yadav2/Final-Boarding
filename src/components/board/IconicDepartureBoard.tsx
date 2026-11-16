import React, { useState } from 'react';
import { Milestone, ProjectSettings } from '../../types';
import { useCountdown } from '../../hooks/useCountdown';
import { airportAudio } from '../../utils/sound';

interface IconicDepartureBoardProps {
  settings: ProjectSettings;
  milestones: Milestone[];
  onSelectMilestone: (milestone: Milestone) => void;
  onOpenSettings?: () => void;
}

export const IconicDepartureBoard: React.FC<IconicDepartureBoardProps> = ({
  settings,
  milestones,
  onSelectMilestone,
}) => {
  const { days, hours, minutes, seconds, isDeparted } = useCountdown(settings.deadline);
  const [showFullPrecision, setShowFullPrecision] = useState(false);

  // Find currently active milestone (first non-done milestone)
  const activeMilestone = milestones.find((m) => m.status !== 'DONE') || milestones[0];

  // Format deadline date e.g. "29 NOVEMBER 2026"
  const formatDeadlineDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const day = d.getDate();
      const month = d.toLocaleString('en-US', { month: 'long' }).toUpperCase();
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    } catch {
      return '29 NOVEMBER 2026';
    }
  };

  // Format milestone date e.g. "19 NOV"
  const formatFlightDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const day = d.getDate().toString().padStart(2, '0');
      const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      return `${day} ${month}`;
    } catch {
      return 'TBD';
    }
  };

  // Split string into characters for split-flap tiles
  const daysStr = days.toString().padStart(2, '0');
  const dayFlapChars = [daysStr[0], daysStr[1], ' ', 'D', 'A', 'Y', 'S'];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none py-6 px-4">
      {/* 1. Header: Project Title & Hackathon Subtitle */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-[0.08em] text-[#EDE8DC] uppercase font-normal leading-tight">
          {settings.projectName}
        </h1>
        <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] text-[#8E929B] uppercase font-medium mt-1">
          {settings.eventName}
        </p>
      </div>

      {/* 2. Main Countdown Mechanical Flap Tiles */}
      <div 
        onClick={() => {
          airportAudio.playFlipClick();
          setShowFullPrecision(!showFullPrecision);
        }}
        className="mt-8 sm:mt-10 cursor-pointer group flex flex-col items-center"
        title="Click to toggle live hours:minutes:seconds"
      >
        {/* The Flap Tile Row */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!showFullPrecision ? (
            // [ 1 ] [ 3 ]   [ D ] [ A ] [ Y ] [ S ]
            dayFlapChars.map((char, idx) => {
              if (char === ' ') {
                return <div key={idx} className="w-2 sm:w-3" />;
              }
              return (
                <div
                  key={idx}
                  className="flap-unit w-10 h-16 sm:w-13 sm:h-20 text-3xl sm:text-4xl md:w-15 md:h-22 md:text-5xl font-condensed font-bold text-[#F5A623] transition-transform group-hover:scale-105"
                >
                  <span className="transform -translate-y-[1px]">
                    {char}
                  </span>
                </div>
              );
            })
          ) : (
            // Live ticking precision: [ 1 ] [ 3 ] d : [ 0 ] [ 2 ] h : [ 1 ] [ 8 ] m : [ 4 ] [ 4 ] s
            <div className="flex items-center gap-1 sm:gap-1.5 font-condensed text-[#F5A623]">
              <div className="flex gap-1">
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {daysStr[0]}
                </div>
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {daysStr[1]}
                </div>
              </div>
              <span className="text-xs font-mono text-[#8E929B]">D</span>
              <span className="text-white/30 px-0.5">:</span>

              <div className="flex gap-1">
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {hours.toString().padStart(2, '0')[0]}
                </div>
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {hours.toString().padStart(2, '0')[1]}
                </div>
              </div>
              <span className="text-xs font-mono text-[#8E929B]">H</span>
              <span className="text-white/30 px-0.5">:</span>

              <div className="flex gap-1">
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {minutes.toString().padStart(2, '0')[0]}
                </div>
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {minutes.toString().padStart(2, '0')[1]}
                </div>
              </div>
              <span className="text-xs font-mono text-[#8E929B]">M</span>
              <span className="text-white/30 px-0.5">:</span>

              <div className="flex gap-1">
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {seconds.toString().padStart(2, '0')[0]}
                </div>
                <div className="flap-unit w-8 h-14 sm:w-11 sm:h-18 text-2xl sm:text-3xl font-bold">
                  {seconds.toString().padStart(2, '0')[1]}
                </div>
              </div>
              <span className="text-xs font-mono text-[#8E929B]">S</span>
            </div>
          )}
        </div>

        {/* Live ticking hint */}
        <span className="text-[10px] font-mono text-[#8E929B]/60 mt-2 uppercase tracking-widest group-hover:text-[#F5A623] transition-colors">
          {showFullPrecision
            ? 'LIVE TICKING • CLICK FOR SUMMARY TILES'
            : `${hours}h ${minutes}m ${seconds}s remaining • Click to expand`}
        </span>
      </div>

      {/* 3. TO GATE CLOSE & Scheduled Date */}
      <div className="text-center mt-5 sm:mt-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-condensed font-bold tracking-[0.08em] text-[#EDE8DC] uppercase leading-none">
          {isDeparted ? 'GATE HAS CLOSED' : 'TO GATE CLOSE'}
        </h2>
        <p className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#8E929B] uppercase font-medium mt-2">
          GATE CLOSES: {formatDeadlineDate(settings.deadline)}
        </p>
      </div>

      {/* 4. Active Milestone Gate: NOW BOARDING */}
      <div 
        onClick={() => {
          airportAudio.playFlipClick();
          onSelectMilestone(activeMilestone);
        }}
        className="text-center mt-8 sm:mt-10 cursor-pointer group p-3 rounded-xl hover:bg-white/[0.02] transition-colors max-w-md w-full"
      >
        <div className="text-lg sm:text-xl font-condensed font-bold tracking-[0.18em] text-[#52C41A] uppercase flex items-center justify-center gap-2">
          <span>NOW BOARDING</span>
          <span className="w-2 h-2 rounded-full bg-[#52C41A] animate-pulse" />
        </div>
        <p className="text-sm sm:text-base text-[#EDE8DC] font-sans mt-1.5 leading-snug group-hover:text-[#F5A623] transition-colors">
          {activeMilestone.deliverable || activeMilestone.description}
        </p>
      </div>

      {/* 5. UPCOMING DEPARTURES Split-Flap Board Matrix */}
      <div className="w-full mt-8 sm:mt-10">
        <div className="text-center text-xs font-condensed font-bold tracking-[0.25em] text-[#8E929B] uppercase mb-3">
          UPCOMING DEPARTURES
        </div>

        {/* The Authentic Split-Flap Board Frame */}
        <div className="w-full bg-[#0E1014] border border-white/10 rounded-xl p-2.5 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.8)] font-mono">
          <div className="space-y-1 sm:space-y-1.5">
            {milestones.map((milestone, idx) => {
              const isDone = milestone.status === 'DONE';
              const isDelayed = milestone.status === 'DELAYED';
              const isCurrent = activeMilestone.id === milestone.id;

              return (
                <div
                  key={milestone.id}
                  onClick={() => {
                    airportAudio.playFlipClick();
                    onSelectMilestone(milestone);
                  }}
                  className={`group flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-lg border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#181A20] border-[#F5A623]/30 shadow-[0_0_15px_rgba(245,166,35,0.08)]'
                      : isDelayed
                      ? 'bg-[#1C1214] border-[#FF453A]/30'
                      : isDone
                      ? 'bg-[#101216] border-white/5 opacity-70'
                      : 'bg-[#13151A] border-white/[0.06] hover:border-white/15 hover:bg-[#16181F]'
                  }`}
                >
                  {/* Left: Flight index in amber */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="font-mono font-bold text-sm sm:text-base text-[#F5A623]">
                      0{idx + 1}
                    </span>
                    <span className="text-white/20">|</span>
                  </div>

                  {/* Center: Flight Title */}
                  <div className="flex-1 min-w-0 px-2 sm:px-3 text-left">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm sm:text-base font-condensed font-semibold tracking-wider uppercase truncate ${
                        isDone
                          ? 'line-through text-[#8E929B]'
                          : isCurrent
                          ? 'text-[#EDE8DC] group-hover:text-[#F5A623]'
                          : 'text-[#EDE8DC]'
                      }`}>
                        {milestone.title}
                      </span>
                      {isDone && (
                        <span className="text-[10px] text-[#52C41A] font-mono uppercase">
                          ✓
                        </span>
                      )}
                      {isDelayed && (
                        <span className="text-[10px] text-[#FF453A] font-mono uppercase">
                          DELAY
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Divider & Date in cream */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-right">
                    <span className="text-white/20">|</span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-[#EDE8DC] tracking-wider uppercase">
                      {formatFlightDate(milestone.date)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Footer: Metaphor Tagline and Sparkle Icon */}
      <div className="w-full flex items-center justify-between pt-10 sm:pt-14 mt-auto text-xs font-mono text-[#8E929B]">
        <div className="w-4" /> {/* Spacer */}
        <p className="text-[11px] sm:text-xs tracking-[0.22em] text-[#8E929B] uppercase font-mono text-center">
          {settings.tagline.toUpperCase()}
        </p>
        {/* Subtle four-point diamond star / sparkle */}
        <div className="text-[#8E929B]/60 text-base select-none">
          ✦
        </div>
      </div>
    </div>
  );
};
