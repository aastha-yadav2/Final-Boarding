# Development Guide: FINAL BOARDING

---

## 1. Project Directory Anatomy

```
FINAL-BOARDING/
│
├── package.json               # Dependencies, scripts, and build targets
├── vite.config.ts             # Vite configuration with React and Tailwind plugins
├── tsconfig.json              # TypeScript project references and strict compiler settings
├── index.html                 # HTML shell, fonts, and root mount point
│
├── src/
│   ├── main.tsx               # Application bootstrapping with React StrictMode
│   ├── App.tsx                # Master state controller, modal manager, tab router
│   ├── index.css              # Tailwind v4 import, custom @theme tokens, airport styles
│   │
│   ├── types/
│   │   └── index.ts           # Strict TypeScript contracts for Milestones, Tasks, Settings
│   │
│   ├── data/
│   │   └── initialData.ts     # Initial hackathon mock data and default configurations
│   │
│   ├── utils/
│   │   ├── time.ts            # Countdown arithmetic, airport date formatters, progress logic
│   │   ├── sound.ts           # Web Audio API synthesizer for chimes and flip clicks
│   │   └── storage.ts         # Schema-safe localStorage wrappers with JSON parse guards
│   │
│   ├── hooks/
│   │   ├── useCountdown.ts    # Real-time 1000ms ticking countdown hook
│   │   ├── useLocalStorage.ts # Reactive localStorage synchronization hook
│   │   └── useFeatureFlags.ts # Flagsmith drop-in feature flags abstraction hook
│   │
│   ├── components/
│   │   ├── ui/                # GlassCard, SplitFlapDisplay, StatusBadge, ProgressBar, ConfirmModal
│   │   ├── layout/            # Header, Navigation, AirportTicker
│   │   ├── dashboard/         # LiveCountdown, FlightMetrics, NextDepartureCard
│   │   ├── milestones/        # MilestoneTimeline, MilestoneCard, MilestoneEditModal, RescheduleModal
│   │   ├── missions/          # DailyMissionBoard, TaskItem, TaskModal
│   │   ├── recovery/          # RecoveryRadar
│   │   └── settings/          # SettingsModal
│   │
│   └── pages/
│       ├── FlightDashboard.tsx# Control Tower view
│       ├── MilestonesPage.tsx # Flight Board view
│       ├── MissionsPage.tsx   # Crew Missions checklist view
│       └── RecoveryPage.tsx   # Recovery Radar disruption view
```

---

## 2. Development Conventions

1. **Strict TypeScript:**
   - No implicit `any`.
   - All component props defined via typed interfaces.
   - Run `npm run build` locally before pushing to catch any unused imports or type mismatches.
2. **Tailwind CSS v4 Usage:**
   - Use custom airport palette tokens: `bg-[#0B0C0E]`, `text-[#FFB000]`, `text-[#EDE8DC]`, `text-[#8E929B]`.
   - Use glassmorphism classes: `.glass-panel`, `.split-flap-char`, `.amber-glow`.
3. **Web Audio Policy:**
   - Browsers enforce autoplay policies; the `AudioContext` initializes on the first user interaction (click) to ensure seamless sound reproduction.

