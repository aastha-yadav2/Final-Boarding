import React from 'react';
import { Milestone, Task } from '../types';
import { RecoveryRadar } from '../components/recovery/RecoveryRadar';

interface RecoveryPageProps {
  milestones: Milestone[];
  tasks: Task[];
  onRescheduleMilestone: (milestone: Milestone) => void;
  onSelectTask: (task: Task) => void;
  onGoToMissions: () => void;
}

export const RecoveryPage: React.FC<RecoveryPageProps> = ({
  milestones,
  tasks,
  onRescheduleMilestone,
  onSelectTask,
  onGoToMissions,
}) => {
  return (
    <div className="space-y-6">
      <RecoveryRadar
        milestones={milestones}
        tasks={tasks}
        onRescheduleMilestone={onRescheduleMilestone}
        onSelectTask={onSelectTask}
        onGoToMissions={onGoToMissions}
      />
    </div>
  );
};

