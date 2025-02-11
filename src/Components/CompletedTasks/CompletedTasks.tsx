import React from "react";
import "./CompletedTasks.css";
import { Task } from "../../types/tasks";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "../TaskItem";

interface CompletedTasksProps {
  tasks: Task[];
}

export const CompletedTasks = ({ tasks }: CompletedTasksProps) => {
  const { setNodeRef } = useDroppable({
    id: "completed-tasks",
  });
  return (
    <div ref={setNodeRef} className="completed-tasks">
      <h2>Completed Tasks!</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
