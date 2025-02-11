import React from "react";
import "./TaskItem.css";
import { Task } from "../../types/tasks";
import { useDraggable } from "@dnd-kit/core";

interface TaskItemProps {
  task: Task;
  data?: { task: Task };
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-item"
    >
      <input type="checkbox" checked={task.completed} readOnly />
      {task.todo}
    </li>
  );
};

{
  /* <li key={task.id}>
<input
  type="checkbox"
  id={`task-check-${task.id}`}
  checked={task.completed}
/>
<Draggble key={task.id} id={task.id}>
  <label
    htmlFor={`task-check-${task.id}`}
    style={
      task.completed
        ? {
            textDecoration: "line-through",
            pointerEvents: "none",
          }
        : { pointerEvents: "none" }
    }
  >
    {task.todo}
  </label>
</Draggble>
</li> */
}
