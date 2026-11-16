import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  amberGlow?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  sublabel,
  size = 'md',
  showPercentage = true,
  amberGlow = true,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            {label && <span className="font-semibold text-[#EDE8DC] tracking-wider uppercase">{label}</span>}
            {sublabel && <span className="text-[#8E929B] text-[11px]">{sublabel}</span>}
          </div>
          {showPercentage && (
            <span className="font-bold text-[#FFB000] tracking-tight amber-glow">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div className={`w-full rounded-full bg-[#1A1D24] border border-white/5 overflow-hidden p-[2px] ${heightClasses[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r from-[#FFB000] via-[#FFC033] to-[#FFD573] transition-all duration-700 ease-out relative ${
            amberGlow ? 'shadow-[0_0_12px_rgba(255,176,0,0.5)]' : ''
          }`}
          style={{ width: `${clamped}%` }}
        >
          {/* Subtle runway stripes */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(0,0,0,0.25)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.25)_50%,rgba(0,0,0,0.25)_75%,transparent_75%,transparent)] bg-[length:12px_12px]" />
        </div>
      </div>
    </div>
  );
};

