import React from 'react';
import { LayoutDashboard, Compass, CheckSquare, ShieldAlert, Settings2 } from 'lucide-react';
import { TabType } from '../../types';
import { airportAudio } from '../../utils/sound';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  delayedCount: number;
  missionPendingCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  delayedCount,
  missionPendingCount,
}) => {
  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'CONTROL TOWER',
      sublabel: 'Dashboard & Countdown',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'milestones' as TabType,
      label: 'FLIGHT BOARD',
      sublabel: '5 Milestones',
      icon: Compass,
      badge: null,
    },
    {
      id: 'missions' as TabType,
      label: 'DAILY MISSIONS',
      sublabel: 'Checklist & Crew Tasks',
      icon: CheckSquare,
      badge: missionPendingCount > 0 ? missionPendingCount : null,
      badgeColor: 'bg-[#FFB000]/20 text-[#FFB000] border-[#FFB000]/30',
    },
    {
      id: 'recovery' as TabType,
      label: 'RECOVERY RADAR',
      sublabel: 'Overdue & Rebooking',
      icon: ShieldAlert,
      badge: delayedCount > 0 ? `${delayedCount} ALERT` : null,
      badgeColor: 'bg-[#FF453A]/20 text-[#FF453A] border-[#FF453A]/30 animate-pulse',
    },
    {
      id: 'settings' as TabType,
      label: 'GATE SETTINGS',
      sublabel: 'Project & Flags',
      icon: Settings2,
      badge: null,
    },
  ];

  const handleSelect = (tab: TabType) => {
    airportAudio.playFlipClick();
    onTabChange(tab);
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#121418]/80 border border-white/[0.08] backdrop-blur-xl overflow-x-auto no-scrollbar shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex-1 min-w-[140px] md:min-w-0 py-3 px-4 rounded-xl font-mono text-left transition-all duration-300 relative flex items-center justify-between group ${
                isActive
                  ? 'bg-gradient-to-r from-[#1C170E] to-[#251E11] text-[#FFB000] border border-[#FFB000]/35 shadow-[0_0_20px_rgba(255,176,0,0.12)]'
                  : 'text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive ? 'bg-[#FFB000]/20 text-[#FFB000]' : 'bg-white/5 text-[#8E929B] group-hover:text-[#EDE8DC]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase">
                    {tab.label}
                  </div>
                  <div className="text-[10px] text-[#8E929B] font-sans hidden lg:block">
                    {tab.sublabel}
                  </div>
                </div>
              </div>

              {tab.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${tab.badgeColor}`}
                >
                  {tab.badge}
                </span>
              )}

              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-[#FFB000] rounded-full shadow-[0_0_8px_#FFB000]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

