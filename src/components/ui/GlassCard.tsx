import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'amber' | 'elevated' | 'alert' | 'ghost';
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  glow = false,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'amber':
        return 'bg-[#1C170E]/60 border-[#FFB000]/30 shadow-[0_0_20px_rgba(255,176,0,0.06)]';
      case 'alert':
        return 'bg-[#220F11]/60 border-[#FF453A]/30 shadow-[0_0_20px_rgba(255,69,58,0.08)]';
      case 'elevated':
        return 'bg-[#14161B]/80 border-white/10 shadow-[0_16px_32px_rgba(0,0,0,0.5)]';
      case 'ghost':
        return 'bg-transparent border-white/5 hover:border-white/15';
      case 'default':
      default:
        return 'bg-[#121418]/70 border-white/[0.08] hover:border-white/[0.14]';
    }
  };

  const glowStyle = glow ? 'shadow-[0_0_25px_rgba(255,176,0,0.18)] border-[#FFB000]/40' : '';

  return (
    <div
      className={`relative rounded-2xl backdrop-blur-xl border transition-all duration-300 ${getVariantStyles()} ${glowStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

