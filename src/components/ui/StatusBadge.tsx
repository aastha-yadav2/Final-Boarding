import React from 'react';
import { MilestoneStatus } from '../../types';

interface StatusBadgeProps {
  status: MilestoneStatus;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showPulse = true,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'DONE':
        return {
          bg: 'bg-[#30B0C7]/15 text-[#30B0C7] border-[#30B0C7]/30',
          dot: 'bg-[#30B0C7]',
          pulseColor: 'bg-[#30B0C7]/50',
          label: 'DEPARTED / DONE',
        };
      case 'IN PROGRESS':
        return {
          bg: 'bg-[#FFB000]/15 text-[#FFB000] border-[#FFB000]/40 shadow-[0_0_12px_rgba(255,176,0,0.15)]',
          dot: 'bg-[#FFB000]',
          pulseColor: 'bg-[#FFB000]/60',
          label: 'NOW BOARDING',
        };
      case 'DELAYED':
        return {
          bg: 'bg-[#FF453A]/15 text-[#FF453A] border-[#FF453A]/40 shadow-[0_0_12px_rgba(255,69,58,0.18)]',
          dot: 'bg-[#FF453A]',
          pulseColor: 'bg-[#FF453A]/70',
          label: 'DELAYED',
        };
      case 'REBOOKED':
        return {
          bg: 'bg-[#BF5AF2]/15 text-[#BF5AF2] border-[#BF5AF2]/35',
          dot: 'bg-[#BF5AF2]',
          pulseColor: 'bg-[#BF5AF2]/50',
          label: 'REBOOKED',
        };
      case 'ON TIME':
      default:
        return {
          bg: 'bg-[#34C759]/15 text-[#34C759] border-[#34C759]/30',
          dot: 'bg-[#34C759]',
          pulseColor: 'bg-[#34C759]/40',
          label: 'ON TIME',
        };
    }
  };

  const config = getStatusConfig();

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs px-2.5 py-1 gap-2 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5 font-bold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-mono tracking-wider uppercase backdrop-blur-md select-none transition-colors ${config.bg} ${sizeClasses[size]} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {showPulse && (status === 'IN PROGRESS' || status === 'DELAYED') && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulseColor}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>
      <span>{config.label}</span>
    </span>
  );
};

