# System Architecture: FINAL BOARDING

---

## 1. High-Level Architectural Diagram

FINAL BOARDING is a modern single-page client architecture built on React 19, TypeScript, and Vite. All computational state, audio synthesis, and persistence operate natively within the browser environment.

```mermaid
graph TD
    subgraph Browser Client
        IndexHTML["index.html"] --> MainTSX["src/main.tsx"]
        MainTSX --> App["src/App.tsx (Root Controller)"]

        subgraph Core State & Hooks
            App --> LS["useLocalStorage<T>"]
            App --> CD["useCountdown()"]
            App --> FF["useFeatureFlags()"]
            App --> Audio["airportAudio (Web Audio Synthesizer)"]
        end

        subgraph Layout Shell
            App --> Ticker["AirportTicker.tsx"]
            App --> Header["Header.tsx"]
            App --> Nav["Navigation.tsx"]
            App --> Footer["Control Tower Footer"]
        end

        subgraph Page Views
            App --> P1["FlightDashboard.tsx (Control Tower)"]
            App --> P2["MilestonesPage.tsx (Flight Board)"]
            App --> P3["MissionsPage.tsx (Crew Checklist)"]
            App --> P4["RecoveryPage.tsx (Recovery Radar)"]
        end

        subgraph Modals & Dialogs
            App --> M1["MilestoneEditModal.tsx"]
            App --> M2["RescheduleModal.tsx"]
            App --> M3["TaskModal.tsx"]
            App --> M4["SettingsModal.tsx"]
            App --> M5["ConfirmModal.tsx"]
        end

        subgraph Local Persistence
            LS <--> BrowserStorage[("Browser localStorage")]
        end
    end
```

---

## 2. Component Hierarchy & Responsibilities

| Component / File | Architectural Layer | Primary Responsibility |
| :--- | :--- | :--- |
| `src/main.tsx` | Entry Point | Bootstraps React DOM root with StrictMode. |
| `src/App.tsx` | Orchestrator | Owns primary application state, modal controls, tab routing, and event delegation. |
| `src/components/layout/Header.tsx` | Layout | Displays brand, callsign, sound toggle button, reset trigger, and avionics config button. |
| `src/components/layout/AirportTicker.tsx` | Layout | Displays live UTC system clock, flight control status, and hackathon banner. |
| `src/components/layout/Navigation.tsx` | Layout | Provides flight control tabs with real-time alert badges. |
| `src/components/dashboard/LiveCountdown.tsx` | Dashboard UI | Renders live countdown with split-flap segments; handles expired flight states. |
| `src/components/dashboard/FlightMetrics.tsx` | Dashboard UI | Calculates overall progress, gate clearance, task ratios, and system status. |
| `src/components/dashboard/NextDepartureCard.tsx` | Dashboard UI | Highlights immediate upcoming gate with target dates and required deliverable. |
| `src/components/milestones/MilestoneTimeline.tsx` | Milestone UI | Visual runway timeline connecting all 5 milestone nodes. |
| `src/components/milestones/MilestoneCard.tsx` | Milestone UI | Renders individual milestone status, gate metadata, deliverable, and actions. |
| `src/components/milestones/MilestoneEditModal.tsx` | Dialog | Form to update milestone details, dates, gates, and statuses. |
| `src/components/milestones/RescheduleModal.tsx` | Dialog | Dedicated rebooking desk to revise delayed flight departure dates with rationale. |
| `src/components/missions/DailyMissionBoard.tsx` | Mission UI | Crew task board with progress bar, filter pills, and empty states. |
| `src/components/missions/TaskItem.tsx` | Mission UI | Interactive checklist item with category badges, priority tiers, and sound triggers. |
| `src/components/recovery/RecoveryRadar.tsx` | Recovery UI | Diagnostic engine identifying overdue gates and tasks; recommends next unblocking directive. |
| `src/components/settings/SettingsModal.tsx` | Settings UI | Form to edit project metadata, deadline, feature flags, and factory reset. |
| `src/components/ui/GlassCard.tsx` | Design System | Translucent frosted glass panel with border and amber glow options. |
| `src/components/ui/SplitFlapDisplay.tsx` | Design System | Mechanical split-flap character segment display. |
| `src/components/ui/StatusBadge.tsx` | Design System | Airport gate status badge with pulsing LED indicators. |

---

## 3. Data Flow Architecture

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant View as React Page Component
    participant App as App.tsx (State Store)
    participant Storage as localStorage
    participant Audio as Web Audio Synthesizer

    User->>View: Clicks "BOARD & DEPART" on Milestone
    View->>App: handleMilestoneStatusChange(id, 'DONE')
    App->>Audio: playSuccessChime()
    App->>Storage: setStoredItem('fb_milestones', updatedMilestones)
    App-->>View: State updated with recalculation (Progress increases)
    View-->>User: Visual feedback (Confetti burst & badge update)
```

---

## 4. Countdown Lifecycle Flow

```mermaid
stateDiagram-v2
    [*] --> Idle: Mount useCountdown(deadlineISO)
    Idle --> Calculating: Calculate initial difference (target - Date.now())
    Calculating --> Running: diff > 0
    Calculating --> Expired: diff <= 0

    state Running {
        [*] --> IntervalTick: setInterval(1000ms)
        IntervalTick --> ComputeSegments: Total seconds / days / hours / mins / secs
        ComputeSegments --> UpdateState: setCountdown(newTime)
        UpdateState --> IntervalTick
    }

    state Expired {
        [*] --> DispatchedState: isDeparted = true
        DispatchedState --> BannerDisplay: "FLIGHT HAS DEPARTED"
    }

    Running --> Expired: When clock passes target
```

---

## 5. Web Audio Synthesis Architecture

Rather than relying on external MP3 audio files that introduce latency, network dependencies, or playback failures, FINAL BOARDING implements a custom Web Audio API synthesizer (`src/utils/sound.ts`):

- **Two-Tone Announcement Chime (Ding-Dong):**
  - Sine oscillator note 1: F5 (698.46 Hz) with linear attack and exponential decay.
  - Sine oscillator note 2: C6 (1046.5 Hz) triggered at +350ms offset.
- **Split-Flap Mechanical Click:**
  - Triangle oscillator dropping from 180 Hz to 40 Hz over 40ms to simulate mechanical flap flipping.
- **Milestone Celebration Chime:**
  - 4-note ascending major arpeggio (C5, E5, G5, C6) with smooth release.
- **Recovery Warning Tone:**
  - Dual-pitch sawtooth alert tone (320 Hz / 260 Hz).

---

## 6. Feature Flag Architecture (Flagsmith Preparation)

The application includes an experiment-ready feature flag architecture located at `src/hooks/useFeatureFlags.ts`.

```typescript
// Flagsmith Drop-In Abstraction Schema
export interface FeatureFlags {
  enableAudioChimes: boolean;
  enableSplitFlapAnimation: boolean;
  enableStrictRecoveryMode: boolean;
  enableEmergencyChecklist: boolean;
}
```

The hook exposes `isFeatureEnabled(key)` and currently evaluates against locally persisted overrides in `localStorage`. When the official Flagsmith SDK is connected, this hook acts as a zero-refactor adapter delegating directly to `flagsmith.hasFeature(key)`.
