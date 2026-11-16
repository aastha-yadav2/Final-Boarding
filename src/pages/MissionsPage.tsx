import React from 'react';
import { Task } from '../types';
import { DailyMissionBoard } from '../components/missions/DailyMissionBoard';

interface MissionsPageProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const MissionsPage: React.FC<MissionsPageProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="space-y-6">
      <DailyMissionBoard
        tasks={tasks}
        onToggleTask={onToggleTask}
        onAddTask={onAddTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
};

