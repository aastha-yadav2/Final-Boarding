export type MilestoneStatus = 'ON TIME' | 'IN PROGRESS' | 'DELAYED' | 'DONE' | 'REBOOKED';

export interface Milestone {
  id: string;
  flightCode: string; // e.g. "FB-01"
  title: string;
  date: string; // ISO string e.g. "2026-11-19T23:59:00"
  description: string;
  deliverable: string;
  status: MilestoneStatus;
  gate: string;
  terminal: string;
  originalDate?: string;
  completedAt?: string;
  notes?: string;
}

export type TaskPriority = 'CRITICAL' | 'STANDARD' | 'ROUTINE';
export type TaskCategory = 'PRE-FLIGHT' | 'AVIONICS' | 'PAYLOAD' | 'QUALITY' | 'FINAL RUNWAY';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  completed: boolean;
  milestoneId?: string;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ProjectSettings {
  projectName: string;
  tagline: string;
  eventName: string;
  deadline: string; // ISO string
  flightCallsign: string;
  soundEnabled: boolean;
  airportCode: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isDeparted: boolean;
  totalSecondsRemaining: number;
  formattedPercentage: number;
}

export interface FeatureFlags {
  enableAudioChimes: boolean;
  enableSplitFlapAnimation: boolean;
  enableStrictRecoveryMode: boolean;
  enableEmergencyChecklist: boolean;
}

export type TabType = 'dashboard' | 'milestones' | 'missions' | 'recovery' | 'settings';
