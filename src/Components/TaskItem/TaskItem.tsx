import React, { ChangeEvent } from "react";
import "./TaskItem.css";
import { Task } from "../../types/tasks";
import { useDraggable } from "@dnd-kit/core";
import { useAppDispatch } from "../../store/hooks";
import { moveTask } from "../../store/task/taskSlice";

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

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    dispatch(moveTask({ id: task.id, toCompleted: e.target.checked }));
  };

  return (
    <li ref={setNodeRef} style={style} className="task-item">
      <input type="checkbox" checked={task.completed} onChange={handleChange} />
      <span {...attributes} {...listeners}>
        {task.todo}
      </span>
    </li>
  );
};
