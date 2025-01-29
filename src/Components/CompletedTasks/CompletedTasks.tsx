import React from "react";
import { useAppSelector } from "../../store/hooks";
import { selectCompletedTasks } from "../../store/task/taskSelectors";
import "./CompletedTasks.css";

export const CompletedTasks = () => {
  const completedTasks = useAppSelector(selectCompletedTasks);
  return (
    <div className="completed-tasks">
      <h2>Completed Tasks!</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>{task.todo}</li>
        ))}
      </ul>
    </div>
  );
};
