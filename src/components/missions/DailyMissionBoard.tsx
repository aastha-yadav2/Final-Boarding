import React, { useState } from 'react';
import { Plus, ClipboardList } from 'lucide-react';
import { Task } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { ProgressBar } from '../ui/ProgressBar';
import { TaskItem } from './TaskItem';
import { calculateTaskProgress } from '../../utils/time';

interface DailyMissionBoardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const DailyMissionBoard: React.FC<DailyMissionBoardProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED' | 'CRITICAL'>('ALL');

  const taskProgress = calculateTaskProgress(tasks);
  const completedCount = tasks.filter(t => t.completed).length;

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'ACTIVE') return !t.completed;
    if (filter === 'COMPLETED') return t.completed;
    if (filter === 'CRITICAL') return t.priority === 'CRITICAL';
    return true;
  });

  return (
    <GlassCard className="p-6 sm:p-8">
      {/* Header with Title and Add Mission Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-[10px] font-mono tracking-widest text-[#FFB000] uppercase font-bold flex items-center gap-2">
            <span>PRE-FLIGHT CHECKLIST</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB000]" />
            <span className="text-[#8E929B] font-normal">CREW DIRECTIVES</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-[#EDE8DC] mt-0.5">
            Daily Flight Missions
          </h2>
          <p className="text-xs text-[#8E929B] font-mono mt-1">
            Execute tactical daily operations to clear upcoming milestone gates.
          </p>
        </div>

        <button
          onClick={onAddTask}
          className="px-5 py-2.5 rounded-xl bg-[#FFB000] hover:bg-[#FFC033] text-black font-mono text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,176,0,0.25)] transition-all uppercase tracking-wider self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Mission Task</span>
        </button>
      </div>

      {/* Daily Progress Gauge */}
      <div className="my-6 p-4 rounded-xl bg-black/40 border border-white/5">
        <ProgressBar
          progress={taskProgress}
          label="DAILY CREW COMPLETION RATE"
          sublabel={`${completedCount} of ${tasks.length} missions cleared`}
          size="md"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 pb-4 overflow-x-auto no-scrollbar font-mono text-xs">
        <div className="flex items-center gap-1.5">
          {(['ALL', 'ACTIVE', 'COMPLETED', 'CRITICAL'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg border transition-all uppercase tracking-wider text-[11px] font-semibold ${
                filter === tab
                  ? 'bg-white/10 border-[#FFB000]/40 text-[#FFB000]'
                  : 'bg-transparent border-transparent text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-[#8E929B] font-mono shrink-0 hidden sm:inline">
          Showing {filteredTasks.length} {filter.toLowerCase()} directive(s)
        </span>
      </div>

      {/* Task List or Empty State */}
      <div className="space-y-2.5 mt-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-white/10 bg-black/20">
            <div className="w-14 h-14 rounded-2xl bg-[#FFB000]/10 border border-[#FFB000]/20 text-[#FFB000] flex items-center justify-center mb-4">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-display text-[#EDE8DC] tracking-wide">
              {filter === 'ALL'
                ? 'Checklist Manifest Empty'
                : `No ${filter} Missions Found`}
            </h3>
            <p className="text-xs text-[#8E929B] font-mono mt-1.5 max-w-sm leading-relaxed">
              {filter === 'ALL'
                ? 'No active missions logged for today. Dispatch your first pre-flight directive to maintain runway momentum.'
                : 'Try switching filters or add a new mission task for this flight category.'}
            </p>
            {filter === 'ALL' && (
              <button
                onClick={onAddTask}
                className="mt-5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-[#FFB000] font-mono text-xs font-semibold border border-[#FFB000]/30 transition-all flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Dispatch First Mission</span>
              </button>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
};
