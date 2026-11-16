import React from 'react';
import { Check, Trash2, Edit3, Clock } from 'lucide-react';
import { Task } from '../../types';
import { formatShortDate } from '../../utils/time';
import { airportAudio } from '../../utils/sound';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const handleToggle = () => {
    if (!task.completed) {
      airportAudio.playFlipClick();
    }
    onToggle(task.id);
  };

  const getPriorityBadge = () => {
    switch (task.priority) {
      case 'CRITICAL':
        return 'text-[#FF453A] border-[#FF453A]/30 bg-[#FF453A]/10';
      case 'STANDARD':
        return 'text-[#FFB000] border-[#FFB000]/30 bg-[#FFB000]/10';
      case 'ROUTINE':
      default:
        return 'text-[#8E929B] border-white/10 bg-white/5';
    }
  };

  return (
    <div
      className={`group flex items-center justify-between gap-3 p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'bg-black/30 border-white/5 opacity-60'
          : 'bg-[#14161B]/70 border-white/[0.08] hover:border-white/20 hover:bg-[#181A20]'
      }`}
    >
      {/* Left: Checkbox & Title */}
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        <button
          onClick={handleToggle}
          className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
            task.completed
              ? 'bg-[#30B0C7] border-[#30B0C7] text-black'
              : 'border-white/20 hover:border-[#FFB000] bg-black/40'
          }`}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task completed'}
        >
          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider font-semibold ${getPriorityBadge()}`}>
              {task.priority}
            </span>
            <span className="text-[10px] font-mono text-[#8E929B] uppercase tracking-wider hidden sm:inline">
              {task.category}
            </span>
          </div>

          <h4
            onClick={handleToggle}
            className={`text-sm font-sans font-medium text-[#EDE8DC] cursor-pointer truncate transition-all ${
              task.completed ? 'line-through text-[#8E929B]' : 'hover:text-[#FFB000]'
            }`}
          >
            {task.title}
          </h4>
        </div>
      </div>

      {/* Right: Due Date & Actions */}
      <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
        {task.dueDate && (
          <div className="hidden md:flex items-center gap-1.5 text-[#8E929B] text-[11px] px-2.5 py-1 rounded bg-black/30 border border-white/5">
            <Clock className="w-3 h-3 text-[#FFB000]" />
            <span>{formatShortDate(task.dueDate)}</span>
          </div>
        )}

        <button
          onClick={() => onEdit(task)}
          className="p-2 rounded-lg text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5 transition-colors"
          title="Edit Task"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 rounded-lg text-[#8E929B] hover:text-[#FF453A] hover:bg-[#FF453A]/10 transition-colors"
          title="Delete Task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
