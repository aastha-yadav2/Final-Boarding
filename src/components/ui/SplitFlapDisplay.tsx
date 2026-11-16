import React from 'react';

interface SplitFlapDisplayProps {
  value: string | number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padDigits?: number;
  amber?: boolean;
  className?: string;
}

export const SplitFlapDisplay: React.FC<SplitFlapDisplayProps> = ({
  value,
  label,
  size = 'md',
  padDigits = 0,
  amber = true,
  className = '',
}) => {
  let strVal = String(value);
  if (padDigits > 0 && typeof value === 'number') {
    strVal = strVal.padStart(padDigits, '0');
  }

  const chars = strVal.split('');

  const sizeClasses = {
    sm: 'w-7 h-10 text-lg',
    md: 'w-10 h-14 text-2xl md:w-12 md:h-16 md:text-3xl',
    lg: 'w-12 h-16 text-3xl md:w-16 md:h-22 md:text-5xl',
    xl: 'w-14 h-20 text-4xl sm:w-18 sm:h-26 sm:text-5xl md:w-22 md:h-30 md:text-6xl',
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="flex gap-1.5 items-center">
        {chars.map((char, idx) => (
          <div
            key={idx}
            className={`relative flex items-center justify-center font-mono font-bold rounded-lg split-flap-char overflow-hidden ${
              sizeClasses[size]
            } ${amber ? 'text-[#FFB000] amber-glow' : 'text-[#EDE8DC]'}`}
          >
            {/* Upper half highlight */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-white/[0.04] pointer-events-none" />
            
            {/* The Character */}
            <span className="z-10 tracking-tight transform-gpu translate-y-[-1px]">
              {char === ' ' ? '\u00A0' : char}
            </span>

            {/* Split Line */}
            <div className="absolute top-1/2 inset-x-0 h-[1.5px] bg-[#070709] border-t border-black/80 border-b border-white/[0.07] z-20 pointer-events-none" />
          </div>
        ))}
      </div>
      {label && (
        <span className="mt-2 text-[10px] sm:text-xs font-mono font-semibold tracking-widest text-[#8E929B] uppercase">
          {label}
        </span>
      )}
    </div>
  );
};

