import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Calendar } from 'lucide-react';
import { Task, TaskCategory, TaskPriority } from '../../types';
import { formatISODateInput } from '../../utils/time';
import { airportAudio } from '../../utils/sound';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt'> & { id?: string }) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('PRE-FLIGHT');
  const [priority, setPriority] = useState<TaskPriority>('STANDARD');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
    } else {
      setTitle('');
      setCategory('PRE-FLIGHT');
      setPriority('STANDARD');
      // Default due tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString());
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    airportAudio.playFlipClick();
    onSave({
      id: task?.id,
      title: title.trim(),
      category,
      priority,
      completed: task ? task.completed : false,
      dueDate: dueDate || undefined,
    });
    onClose();
  };

  const categories: TaskCategory[] = ['PRE-FLIGHT', 'AVIONICS', 'PAYLOAD', 'QUALITY', 'FINAL RUNWAY'];
  const priorities: TaskPriority[] = ['CRITICAL', 'STANDARD', 'ROUTINE'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#121418] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        role="dialog"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#8E929B] hover:text-[#EDE8DC] p-1 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pb-6 border-b border-white/[0.08]">
          <span className="text-[10px] font-mono tracking-widest text-[#FFB000] uppercase font-bold">
            CREW DISPATCH • CHECKLIST MANIFEST
          </span>
          <h2 className="text-xl font-display font-bold text-[#EDE8DC] mt-0.5">
            {task ? 'Edit Mission Task' : 'Dispatch New Mission Task'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
              Task Directive / Action
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Conduct regression test on flight timer..."
              className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Flight Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#121418] text-[#EDE8DC]">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
              >
                {priorities.map((p) => (
                  <option key={p} value={p} className="bg-[#121418] text-[#EDE8DC]">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#8E929B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FFB000]" />
              <span>Target Completion Time</span>
            </label>
            <input
              type="datetime-local"
              value={dueDate ? formatISODateInput(dueDate) : ''}
              onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value).toISOString() : '')}
              className="w-full bg-[#181A20] border border-white/10 rounded-xl px-4 py-2.5 text-[#EDE8DC] focus:outline-none focus:border-[#FFB000]/50 transition-colors"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-[#8E929B] hover:text-[#EDE8DC] hover:bg-white/5 transition-colors uppercase tracking-wider font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FFB000] hover:bg-[#FFC033] text-black font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(255,176,0,0.3)] transition-all uppercase tracking-wider"
            >
              {task ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{task ? 'Update Task' : 'Log Mission'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
