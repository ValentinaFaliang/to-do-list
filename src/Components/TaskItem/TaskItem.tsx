import React, { ChangeEvent, useState } from "react";
import "./TaskItem.css";
import { Task } from "../../types/tasks";
import { useDraggable } from "@dnd-kit/core";
import { useAppDispatch } from "../../store/hooks";
import { moveTask } from "../../store/task/taskSlice";
import dragIcon from "./../../assets/drag.png";
import Tooltip from "../Tooltip";

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

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + window.scrollY, // Учёт прокрутки страницы
      left: rect.left + rect.width + 5 + window.scrollX, // Чуть правее drag-handle
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(moveTask({ id: task.id, toCompleted: e.target.checked }));
  };

  return (
    <li ref={setNodeRef} style={style} className="task-item">
      <div className="task-item__checkbox-and-text">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleChange}
        />
        <span>{task.todo}</span>
      </div>

      <div>
        <span
          {...attributes}
          {...listeners}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="drag-handle"
        >
          <img className="drag-icon" alt="drag-icon" src={dragIcon} />
        </span>
      </div>

      {tooltipVisible && <Tooltip position={tooltipPos} />}
    </li>
  );
};
