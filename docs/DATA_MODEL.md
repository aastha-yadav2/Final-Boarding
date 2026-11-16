# Data Model & Storage Specifications: FINAL BOARDING

Comprehensive technical documentation of the TypeScript data contracts and browser storage schemas used in **FINAL BOARDING**.

---

## 1. Primary TypeScript Interfaces

### A. Milestone Entity (`src/types/index.ts`)
```typescript
export type MilestoneStatus = 'ON TIME' | 'IN PROGRESS' | 'DELAYED' | 'DONE' | 'REBOOKED';

export interface Milestone {
  id: string;               // Unique ID e.g. "m1"
  flightCode: string;       // Aviation callsign e.g. "FL-01"
  title: string;            // e.g. "FLIGHT PLAN"
  date: string;             // ISO-8601 string e.g. "2026-11-19T23:59:00"
  description: string;      // Summary of objectives
  deliverable: string;      // Required proof of work
  status: MilestoneStatus;  // Current gate lifecycle status
  gate: string;             // e.g. "Gate A-01"
  terminal: string;         // e.g. "T1"
  originalDate?: string;    // Pre-rebooking ISO timestamp if rescheduled
  completedAt?: string;     // ISO timestamp when marked DONE
  notes?: string;           // Rebooking rationale or team directives
}
```

### B. Daily Mission Task Entity (`src/types/index.ts`)
```typescript
export type TaskPriority = 'CRITICAL' | 'STANDARD' | 'ROUTINE';
export type TaskCategory = 'PRE-FLIGHT' | 'AVIONICS' | 'PAYLOAD' | 'QUALITY' | 'FINAL RUNWAY';

export interface Task {
  id: string;               // Unique task ID e.g. "t-1700000000"
  title: string;            // Action directive
  category: TaskCategory;   // Mission stage
  priority: TaskPriority;   // Urgency level
  completed: boolean;       // Clearance status
  milestoneId?: string;     // Associated flight gate
  dueDate?: string;         // ISO-8601 target completion time
  createdAt: string;        // Creation timestamp
  completedAt?: string;     // Completion timestamp
}
```

### C. Project Settings (`src/types/index.ts`)
```typescript
export interface ProjectSettings {
  projectName: string;      // e.g. "FINAL BOARDING"
  tagline: string;          // e.g. "Every deadline is a departure time."
  eventName: string;        // e.g. "FLAGSMITH EXPERIMENTATION HACKATHON"
  deadline: string;         // ISO-8601 string e.g. "2026-11-29T23:59:00"
  flightCallsign: string;   // e.g. "FL-2026"
  soundEnabled: boolean;    // Master audio synthesizer mute toggle
  airportCode: string;      // Terminal code e.g. "FSD-GATE1"
}
```

### D. Feature Flags Configuration (`src/types/index.ts`)
```typescript
export interface FeatureFlags {
  enableAudioChimes: boolean;          // Airport two-tone announcement chime
  enableSplitFlapAnimation: boolean;   // Split-flap mechanical visual styles
  enableStrictRecoveryMode: boolean;   // Strict gating on delayed gates
  enableEmergencyChecklist: boolean;   // Quick unblocking spotlight
}
```

---

## 2. Browser LocalStorage Schema

All client state is synchronized under explicit namespaces:

| LocalStorage Key | Data Type | Default Source | Purpose |
| :--- | :--- | :--- | :--- |
| `fb_project_settings` | `ProjectSettings` | `DEFAULT_SETTINGS` | Stores project name, deadline, callsign, and audio mute. |
| `fb_milestones` | `Milestone[]` | `INITIAL_MILESTONES` | Stores the 5 flight milestone gates, dates, and statuses. |
| `fb_crew_tasks` | `Task[]` | `INITIAL_TASKS` | Stores crew mission checklist items and clearance states. |
| `fb_feature_flags` | `FeatureFlags` | `DEFAULT_FEATURE_FLAGS` | Stores client feature flag toggle overrides. |

---

## 3. Storage Safety & Fallback Protocol

Read operations through `src/utils/storage.ts` are guarded by defensive serialization:

```typescript
export function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    const parsed = JSON.parse(item);
    return parsed !== null && parsed !== undefined ? (parsed as T) : defaultValue;
  } catch (error) {
    console.warn(`[FINAL BOARDING] Failed to read ${key}, using fallback:`, error);
    return defaultValue;
  }
}
```

If stored data is corrupted or invalid, the application logs a warning and falls back to safe default mock data without throwing unhandled runtime exceptions.
