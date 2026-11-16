import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import { SplitFlapDisplay } from '../ui/SplitFlapDisplay';
import { GlassCard } from '../ui/GlassCard';
import { formatAirportDate } from '../../utils/time';

interface LiveCountdownProps {
  deadline: string;
  projectName: string;
  eventName: string;
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({
  deadline,
  projectName,
  eventName,
}) => {
  const { days, hours, minutes, seconds, isDeparted } = useCountdown(deadline);

  return (
    <GlassCard variant="amber" glow className="p-6 sm:p-8 overflow-hidden relative">
      {/* Background Radar Line Decorator */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FFB000]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFB000]/15 text-[#FFB000] border border-[#FFB000]/30">
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#FFB000] uppercase font-bold flex items-center gap-2">
              <span>NOW BOARDING</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000] animate-ping" />
              <span className="text-[#8E929B] font-normal">|</span>
              <span className="text-[#EDE8DC] font-normal tracking-wider">{eventName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#EDE8DC] mt-0.5">
              FINAL DEPARTURE COUNTDOWN
            </h2>
          </div>
        </div>

        <div className="text-right font-mono text-xs">
          <div className="text-[#8E929B] uppercase tracking-wider text-[10px]">
            SCHEDULED WHEELS-UP
          </div>
          <div className="text-[#EDE8DC] font-semibold tracking-wider text-sm">
            {formatAirportDate(deadline)}
          </div>
        </div>
      </div>

      {/* Countdown Digits Matrix */}
      <div className="py-8 sm:py-10">
        {isDeparted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="w-16 h-16 text-[#FF453A] mb-4 animate-bounce" />
            <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[#EDE8DC] tracking-wider uppercase">
              FLIGHT HAS DEPARTED
            </h3>
            <p className="text-sm text-[#8E929B] font-mono mt-2 max-w-md">
              The scheduled departure deadline for {projectName} has elapsed. Enter Recovery Mode or extend deadline in Settings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-center items-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5">
              <SplitFlapDisplay value={days} padDigits={2} size="xl" label="DAYS" />
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5">
              <SplitFlapDisplay value={hours} padDigits={2} size="xl" label="HOURS" />
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5">
              <SplitFlapDisplay value={minutes} padDigits={2} size="xl" label="MINUTES" />
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-black/40 border border-white/5">
              <SplitFlapDisplay value={seconds} padDigits={2} size="xl" label="SECONDS" />
            </div>
          </div>
        )}
      </div>

      {/* Control Strip Footer */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8E929B]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34C759]" />
          <span className="tracking-wider">DEPARTURE TELEMETRY ACTIVE</span>
        </div>
        <div className="text-[11px] tracking-widest text-[#FFB000]/80">
          “EVERY DEADLINE IS A DEPARTURE TIME”
        </div>
      </div>
    </GlassCard>
  );
};

