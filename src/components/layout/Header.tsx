import React from 'react';
import { PlaneTakeoff, Volume2, VolumeX, Sliders, RotateCcw } from 'lucide-react';
import { ProjectSettings } from '../../types';
import { airportAudio } from '../../utils/sound';

interface HeaderProps {
  settings: ProjectSettings;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenReset,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0B0C0E]/85 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1C170E] to-[#121418] border border-[#FFB000]/30 shadow-[0_0_20px_rgba(255,176,0,0.15)] group cursor-pointer">
            <PlaneTakeoff className="w-6 h-6 text-[#FFB000] group-hover:scale-110 transition-transform duration-300 transform -rotate-12" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#34C759] border-2 border-[#0B0C0E]" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-wider text-[#EDE8DC] uppercase">
                {settings.projectName}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFB000]/15 text-[#FFB000] border border-[#FFB000]/30 tracking-widest">
                {settings.flightCallsign}
              </span>
            </div>
            <p className="text-xs text-[#8E929B] font-mono tracking-wide mt-0.5 hidden xs:block">
              {settings.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Chime Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                // If turning on, trigger announcement chime
                setTimeout(() => airportAudio.playAnnouncementChime(), 100);
              }
            }}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 font-mono text-xs ${
              soundEnabled
                ? 'bg-[#FFB000]/10 border-[#FFB000]/30 text-[#FFB000] shadow-[0_0_12px_rgba(255,176,0,0.1)]'
                : 'bg-white/5 border-white/10 text-[#8E929B] hover:text-[#EDE8DC]'
            }`}
            title={soundEnabled ? 'Terminal Audio Chimes: Enabled' : 'Terminal Audio Chimes: Muted'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline text-[11px] font-semibold tracking-wider">
              {soundEnabled ? 'AUDIO ON' : 'MUTED'}
            </span>
          </button>

          {/* Reset to Default */}
          <button
            onClick={onOpenReset}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/10 transition-colors font-mono text-xs flex items-center gap-2"
            title="Reset flight data to defaults"
            aria-label="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px] font-semibold tracking-wider">
              RESET
            </span>
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 text-[#EDE8DC] hover:border-[#FFB000]/40 hover:text-[#FFB000] transition-all font-mono text-xs flex items-center gap-2 font-semibold shadow-sm"
            aria-label="Open project settings"
          >
            <Sliders className="w-4 h-4 text-[#FFB000]" />
            <span className="hidden sm:inline tracking-wider">
              AVIONICS CONFIG
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

