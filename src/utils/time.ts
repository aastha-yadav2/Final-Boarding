import { CountdownTime, Milestone, Task } from '../types';

export function calculateCountdown(deadlineISO: string): CountdownTime {
  const target = new Date(deadlineISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isDeparted: true,
      totalSecondsRemaining: 0,
      formattedPercentage: 100,
    };
  }

  const totalSecondsRemaining = Math.floor(diff / 1000);
  const days = Math.floor(totalSecondsRemaining / (3600 * 24));
  const hours = Math.floor((totalSecondsRemaining % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSecondsRemaining % 3600) / 60);
  const seconds = totalSecondsRemaining % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isDeparted: false,
    totalSecondsRemaining,
    formattedPercentage: 0, // calculated relative to project duration
  };
}

export function formatAirportDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'TBD';

    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${year} • ${hours}:${minutes}`;
  } catch {
    return 'INVALID DATE';
  }
}

export function formatShortDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'TBD';
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return `${day} ${month}`;
  } catch {
    return 'TBD';
  }
}

export function formatISODateInput(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return '';
  }
}

export function isOverdue(isoString: string): boolean {
  const target = new Date(isoString).getTime();
  return !isNaN(target) && target < Date.now();
}

export function calculateProgress(milestones: Milestone[]): number {
  if (!milestones.length) return 0;
  const completed = milestones.filter(m => m.status === 'DONE').length;
  return Math.round((completed / milestones.length) * 100);
}

export function calculateTaskProgress(tasks: Task[]): number {
  if (!tasks.length) return 0;
  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}
