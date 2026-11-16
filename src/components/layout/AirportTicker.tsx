import React, { useState, useEffect } from 'react';
import { ProjectSettings } from '../../types';

interface AirportTickerProps {
  settings: ProjectSettings;
  overallProgress: number;
}

export const AirportTicker: React.FC<AirportTickerProps> = ({ settings, overallProgress }) => {
  const [utcTime, setUtcTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().replace('GMT', 'UTC')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#08090B] border-b border-white/[0.06] text-[11px] font-mono py-1.5 px-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-[#8E929B]">
        {/* Left: Ticker updates */}
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-[#FFB000] font-semibold tracking-wider shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#FFB000] animate-pulse" />
            <span>FLIGHT CONTROL LIVE</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-[#EDE8DC] shrink-0 font-medium tracking-wide">
            EVENT: {settings.eventName}
          </span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="hidden sm:inline shrink-0">
            RADAR: <span className="text-[#34C759]">OPTIMAL</span>
          </span>
          <span className="text-white/20 hidden md:inline">|</span>
          <span className="hidden md:inline shrink-0">
            FLIGHT PROGRESS: <span className="text-[#FFB000] font-semibold">{overallProgress}%</span>
          </span>
        </div>

        {/* Right: UTC Clock & Airport Gate */}
        <div className="flex items-center gap-3 shrink-0 text-right">
          <span className="hidden lg:inline text-white/30">TERMINAL ACTIVE</span>
          <span className="text-[#EDE8DC] font-mono tracking-wider font-semibold">
            {utcTime || 'SYSTEM TIME SYNC...'}
          </span>
        </div>
      </div>
    </div>
  );
};

