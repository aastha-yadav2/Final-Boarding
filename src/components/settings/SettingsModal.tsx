import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Sliders, Calendar, Tag, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { ProjectSettings, FeatureFlags } from '../../types';
import { formatISODateInput } from '../../utils/time';
import { airportAudio } from '../../utils/sound';

interface SettingsModalProps {
  settings: ProjectSettings;
  isOpen: boolean;
  featureFlags: FeatureFlags;
  onUpdateFlag: (key: keyof FeatureFlags, val: boolean) => void;
  onClose: () => void;
  onSaveSettings: (updated: ProjectSettings) => void;
  onTriggerReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  isOpen,
  featureFlags,
  onUpdateFlag,
  onClose,
  onSaveSettings,
  onTriggerReset,
}) => {
  const [formData, setFormData] = useState<ProjectSettings>({ ...settings });

  useEffect(() => {
    setFormData({ ...settings });
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    airportAudio.playFlipClick();
    onSaveSettings(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#121418] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8E929B] hover:text-[#EDE8DC] p-1 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08]">
          <div className="p-3 rounded-xl bg-[#FFB000]/10 border border-[#FFB000]/25 text-[#FFB000]">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-[#FFB000] uppercase font-bold">
              AVIONICS CONTROL • CONFIGURATION CONSOLE
            </div>
            <h2 className="text-xl font-display font-bold text-[#EDE8DC] mt-0.5">
              Project Parameters & Flight Deck
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6 font-mono text-xs">
          {/* Project Details Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-wider text-[#FFB000] uppercase flex items-center gap-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Project Identity & Event Target</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors uppercase font-bold"
                />
              </div>

              <div>
                <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                  Callsign / Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.flightCallsign}
                  onChange={(e) => setFormData({ ...formData, flightCallsign: e.target.value })}
                  className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Project Tagline / Flight Directive
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Target Hackathon / Event Name
              </label>
              <input
                type="text"
                required
                value={formData.eventName}
                onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors uppercase"
              />
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FFB000]" />
                <span>Final Departure Deadline (Live Countdown Target)</span>
              </label>
              <input
                type="datetime-local"
                required
                value={formatISODateInput(formData.deadline)}
                onChange={(e) => setFormData({ ...formData, deadline: new Date(e.target.value).toISOString() })}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              />
            </div>
          </div>

          {/* Feature Flag Experimentation Prep Section */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold tracking-wider text-[#FFB000] uppercase flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Flagsmith Experimentation Feature Toggles (Client Prep)</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#8E929B]">
                ARCH-READY
              </span>
            </div>
            <p className="text-[11px] text-[#8E929B] leading-relaxed">
              These client feature flags are architected to map directly to Flagsmith remote evaluations when integrated.
            </p>

            <div className="space-y-2 mt-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <div className="font-semibold text-[#EDE8DC]">Audio Chimes & Chime Synthesizer</div>
                  <div className="text-[10px] text-[#8E929B]">Play realistic airport ding-dong announcements on actions</div>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateFlag('enableAudioChimes', !featureFlags.enableAudioChimes)}
                  className="text-lg p-1 text-[#FFB000]"
                >
                  {featureFlags.enableAudioChimes ? (
                    <ToggleRight className="w-6 h-6 text-[#FFB000]" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-[#8E929B]" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <div className="font-semibold text-[#EDE8DC]">Split-Flap Mechanical Display Style</div>
                  <div className="text-[10px] text-[#8E929B]">Display retro split-flap mechanical seams on counters</div>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateFlag('enableSplitFlapAnimation', !featureFlags.enableSplitFlapAnimation)}
                  className="text-lg p-1 text-[#FFB000]"
                >
                  {featureFlags.enableSplitFlapAnimation ? (
                    <ToggleRight className="w-6 h-6 text-[#FFB000]" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-[#8E929B]" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                <div>
                  <div className="font-semibold text-[#EDE8DC]">Strict Recovery Radar Mode</div>
                  <div className="text-[10px] text-[#8E929B]">Flags delayed milestones until explicitly rebooked</div>
                </div>
                <button
                  type="button"
                  onClick={() => onUpdateFlag('enableStrictRecoveryMode', !featureFlags.enableStrictRecoveryMode)}
                  className="text-lg p-1 text-[#FFB000]"
                >
                  {featureFlags.enableStrictRecoveryMode ? (
                    <ToggleRight className="w-6 h-6 text-[#FFB000]" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-[#8E929B]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Reset Action Callout */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <div>
              <div className="text-[#FF453A] font-semibold">Factory Reset All Flight Data</div>
              <div className="text-[11px] text-[#8E929B]">
                Restore initial hackathon milestones, tasks, and default parameters
              </div>
            </div>

            <button
              type="button"
              onClick={onTriggerReset}
              className="px-4 py-2 rounded-xl border border-[#FF453A]/30 text-[#FF453A] hover:bg-[#FF453A]/10 transition-colors flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Form Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5 transition-colors uppercase tracking-wider font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FFB000] hover:bg-[#FFC033] text-black font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,176,0,0.3)] transition-all uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

