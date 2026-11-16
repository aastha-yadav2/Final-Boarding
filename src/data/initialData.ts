import { Milestone, ProjectSettings, Task } from '../types';

export const DEFAULT_SETTINGS: ProjectSettings = {
  projectName: 'FINAL BOARDING',
  tagline: 'Every deadline is a departure time.',
  eventName: 'FLAGSMITH EXPERIMENTATION HACKATHON',
  deadline: '2026-11-29T23:59:00',
  flightCallsign: 'FL-2026',
  soundEnabled: true,
  airportCode: 'FSD-GATE1',
};

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    flightCode: 'FL-01',
    title: 'FLIGHT PLAN',
    date: '2026-11-19T23:59:00',
    description: 'Finalize problem statement, project idea, and feature scope.',
    deliverable: 'Lock rubric & choose one core idea',
    status: 'IN PROGRESS',
    gate: 'Gate A-01',
    terminal: 'T1',
    notes: 'Define core user stories and hackathon track alignment.'
  },
  {
    id: 'm2',
    flightCode: 'FL-02',
    title: 'SYSTEM READY',
    date: '2026-11-23T23:59:00',
    description: 'Prepare repository, architecture, and development environment.',
    deliverable: 'Scaffolded Repo, CI/CD, & Dependencies',
    status: 'ON TIME',
    gate: 'Gate B-04',
    terminal: 'T1',
    notes: 'Verify TypeScript, Tailwind CSS v4, and clean modular component setup.'
  },
  {
    id: 'm3',
    flightCode: 'FL-03',
    title: 'MVP DEPARTURE',
    date: '2026-11-27T23:59:00',
    description: 'Build the core product and primary user journey.',
    deliverable: 'Working Interactive App with Departure Board UI',
    status: 'ON TIME',
    gate: 'Gate C-12',
    terminal: 'T2',
    notes: 'Deliverable must include live countdown, mission tasks, and recovery flow.'
  },
  {
    id: 'm4',
    flightCode: 'FL-04',
    title: 'QUALITY CHECK',
    date: '2026-11-28T23:59:00',
    description: 'Integrate Flagsmith experimentation, test features, and fix bugs.',
    deliverable: 'Experimentation Framework & E2E Validation',
    status: 'ON TIME',
    gate: 'Gate D-08',
    terminal: 'T2',
    notes: 'Simulate flag evaluation, verify mobile responsiveness, and zero regression.'
  },
  {
    id: 'm5',
    flightCode: 'FL-05',
    title: 'FINAL DEPARTURE',
    date: '2026-11-29T23:59:00',
    description: 'Complete demo, documentation, and hackathon submission.',
    deliverable: 'Final Submission Package & Video Walkthrough',
    status: 'ON TIME',
    gate: 'Gate E-00',
    terminal: 'T3',
    notes: 'Execute final push, generate presentation deck, and confirm receipt.'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Review Flagsmith Experimentation Hackathon criteria & rubrics',
    category: 'PRE-FLIGHT',
    priority: 'CRITICAL',
    completed: true,
    milestoneId: 'm1',
    dueDate: '2026-11-17T18:00:00',
    createdAt: '2026-11-16T10:00:00',
    completedAt: '2026-11-16T14:30:00'
  },
  {
    id: 't-2',
    title: 'Draft problem statement: Airport-grade deadline urgency visualization',
    category: 'PRE-FLIGHT',
    priority: 'CRITICAL',
    completed: false,
    milestoneId: 'm1',
    dueDate: '2026-11-18T20:00:00',
    createdAt: '2026-11-16T10:00:00'
  },
  {
    id: 't-3',
    title: 'Configure React 19 + TypeScript + Tailwind CSS v4 environment',
    category: 'AVIONICS',
    priority: 'STANDARD',
    completed: true,
    milestoneId: 'm2',
    dueDate: '2026-11-20T12:00:00',
    createdAt: '2026-11-16T11:00:00',
    completedAt: '2026-11-16T19:00:00'
  },
  {
    id: 't-4',
    title: 'Design Split-Flap digital display and amber airport glassmorphism theme',
    category: 'PAYLOAD',
    priority: 'STANDARD',
    completed: false,
    milestoneId: 'm3',
    dueDate: '2026-11-24T18:00:00',
    createdAt: '2026-11-16T11:30:00'
  },
  {
    id: 't-5',
    title: 'Prepare Flagsmith experimentation feature-flag interface schema',
    category: 'QUALITY',
    priority: 'STANDARD',
    completed: false,
    milestoneId: 'm4',
    dueDate: '2026-11-28T14:00:00',
    createdAt: '2026-11-16T12:00:00'
  }
];
