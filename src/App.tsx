import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Milestone, 
  MilestoneStatus, 
  ProjectSettings, 
  TabType, 
  Task 
} from './types';
import { 
  DEFAULT_SETTINGS, 
  INITIAL_MILESTONES, 
  INITIAL_TASKS 
} from './data/initialData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useFeatureFlags } from './hooks/useFeatureFlags';
import { airportAudio } from './utils/sound';
import { calculateProgress } from './utils/time';

// Layout & Common Components
import { AirportTicker } from './components/layout/AirportTicker';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { ConfirmModal } from './components/ui/ConfirmModal';

// Modals
import { MilestoneEditModal } from './components/milestones/MilestoneEditModal';
import { RescheduleModal } from './components/milestones/RescheduleModal';
import { TaskModal } from './components/missions/TaskModal';
import { SettingsModal } from './components/settings/SettingsModal';

// Pages
import { FlightDashboard } from './pages/FlightDashboard';
import { MilestonesPage } from './pages/MilestonesPage';
import { MissionsPage } from './pages/MissionsPage';
import { RecoveryPage } from './pages/RecoveryPage';

export const App: React.FC = () => {
  // Application Data Persistence
  const [settings, setSettings] = useLocalStorage<ProjectSettings>('fb_project_settings', DEFAULT_SETTINGS);
  const [milestones, setMilestones] = useLocalStorage<Milestone[]>('fb_milestones', INITIAL_MILESTONES);
  const [tasks, setTasks] = useLocalStorage<Task[]>('fb_crew_tasks', INITIAL_TASKS);

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Feature Flags
  const { flags, setFlag } = useFeatureFlags();

  // Modal State
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [reschedulingMilestone, setReschedulingMilestone] = useState<Milestone | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);

  // Sync sound settings with audio controller
  useEffect(() => {
    airportAudio.setEnabled(settings.soundEnabled && flags.enableAudioChimes);
  }, [settings.soundEnabled, flags.enableAudioChimes]);

  // Milestone Actions
  const handleUpdateMilestone = (updated: Milestone) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
  };

  const handleMilestoneStatusChange = (id: string, status: MilestoneStatus) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const isNowDone = status === 'DONE';
          if (isNowDone) {
            // Trigger confetti celebration
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#FFB000', '#EDE8DC', '#30B0C7', '#FFC033'],
            });
          }
          return {
            ...m,
            status,
            completedAt: isNowDone ? new Date().toISOString() : undefined,
          };
        }
        return m;
      })
    );
  };

  const handleRescheduleMilestone = (id: string, newDateISO: string, reason: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            originalDate: m.originalDate || m.date,
            date: newDateISO,
            status: 'REBOOKED',
            notes: reason,
          };
        }
        return m;
      })
    );
  };

  // Task Actions
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      })
    );
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => {
    if (taskData.id) {
      // Edit existing
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskData.id
            ? { ...t, ...taskData }
            : t
        )
      );
    } else {
      // Add new
      const newTask: Task = {
        ...taskData,
        id: `t-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDeleteId) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDeleteId));
      setTaskToDeleteId(null);
    }
  };

  // Settings Actions
  const handleSaveSettings = (updated: ProjectSettings) => {
    setSettings(updated);
  };

  const handleResetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setMilestones(INITIAL_MILESTONES);
    setTasks(INITIAL_TASKS);
    setConfirmResetOpen(false);
    airportAudio.playAnnouncementChime();
  };

  const overallProgress = calculateProgress(milestones);
  const delayedMilestonesCount = milestones.filter((m) => m.status === 'DELAYED').length;
  const pendingMissionsCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#EDE8DC] selection:bg-[#FFB000]/25 selection:text-[#FFB000] relative">
      {/* 1. Airport Telemetry Marquee Ticker */}
      <AirportTicker settings={settings} overallProgress={overallProgress} />

      {/* 2. Primary Navigation Header */}
      <Header
        settings={settings}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => {
          setSettings({ ...settings, soundEnabled: !settings.soundEnabled });
        }}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onOpenReset={() => setConfirmResetOpen(true)}
      />

      {/* 3. Airport Gate Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'settings') {
            setSettingsModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        delayedCount={delayedMilestonesCount}
        missionPendingCount={pendingMissionsCount}
      />

      {/* 4. Active Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <FlightDashboard
            settings={settings}
            milestones={milestones}
            tasks={tasks}
            onSelectMilestone={(m) => setEditingMilestone(m)}
            onGoToMilestones={() => setActiveTab('milestones')}
            onGoToMissions={() => setActiveTab('missions')}
            onGoToRecovery={() => setActiveTab('recovery')}
            onOpenSettings={() => setSettingsModalOpen(true)}
          />
        )}

        {activeTab === 'milestones' && (
          <MilestonesPage
            milestones={milestones}
            onEditMilestone={(m) => setEditingMilestone(m)}
            onRescheduleMilestone={(m) => setReschedulingMilestone(m)}
            onStatusChange={handleMilestoneStatusChange}
          />
        )}

        {activeTab === 'missions' && (
          <MissionsPage
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={() => {
              setEditingTask(null);
              setTaskModalOpen(true);
            }}
            onEditTask={(task) => {
              setEditingTask(task);
              setTaskModalOpen(true);
            }}
            onDeleteTask={(id) => setTaskToDeleteId(id)}
          />
        )}

        {activeTab === 'recovery' && (
          <RecoveryPage
            milestones={milestones}
            tasks={tasks}
            onRescheduleMilestone={(m) => setReschedulingMilestone(m)}
            onSelectTask={(task) => {
              setEditingTask(task);
              setTaskModalOpen(true);
            }}
            onGoToMissions={() => setActiveTab('missions')}
          />
        )}
      </main>

      {/* 5. Airport Control Tower Footer */}
      <footer className="mt-auto border-t border-white/[0.06] bg-[#08090B] py-8 text-xs font-mono text-[#8E929B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#FFB000]" />
            <span className="font-bold text-[#EDE8DC] tracking-wider uppercase">
              {settings.projectName}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[11px] text-[#8E929B]">
              AIRPORT-GRADE DEADLINE EXECUTION SYSTEM
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] tracking-wider">
            <span>EVENT: {settings.eventName}</span>
            <span className="text-white/20">•</span>
            <span className="text-[#FFB000]">CALLSIGN: {settings.flightCallsign}</span>
          </div>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <MilestoneEditModal
        milestone={editingMilestone}
        isOpen={Boolean(editingMilestone)}
        onClose={() => setEditingMilestone(null)}
        onSave={handleUpdateMilestone}
      />

      <RescheduleModal
        milestone={reschedulingMilestone}
        isOpen={Boolean(reschedulingMilestone)}
        onClose={() => setReschedulingMilestone(null)}
        onReschedule={handleRescheduleMilestone}
      />

      <TaskModal
        task={editingTask}
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />

      <SettingsModal
        settings={settings}
        isOpen={settingsModalOpen}
        featureFlags={flags}
        onUpdateFlag={setFlag}
        onClose={() => setSettingsModalOpen(false)}
        onSaveSettings={handleSaveSettings}
        onTriggerReset={() => {
          setSettingsModalOpen(false);
          setConfirmResetOpen(true);
        }}
      />

      <ConfirmModal
        isOpen={confirmResetOpen}
        title="Reset All Flight Data"
        message="Are you sure you want to reset all milestones, mission tasks, and project configurations to default hackathon settings? All custom progress will be overwritten."
        confirmText="Confirm Reset"
        cancelText="Abort"
        variant="danger"
        onConfirm={handleResetToDefaults}
        onCancel={() => setConfirmResetOpen(false)}
      />

      <ConfirmModal
        isOpen={Boolean(taskToDeleteId)}
        title="Delete Mission Directive"
        message="Are you sure you want to remove this mission task from the crew checklist manifest?"
        confirmText="Delete Task"
        cancelText="Keep Task"
        variant="danger"
        onConfirm={handleConfirmDeleteTask}
        onCancel={() => setTaskToDeleteId(null)}
      />
    </div>
  );
};

export default App;

