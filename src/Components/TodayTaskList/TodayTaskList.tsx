import React from "react";
import "./TodayTaskList.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTodaysTasks } from "../../store/task/taskSelectors";
import { updateStatus } from "../../store/task/taskSlice";

export const TodayTaskList = () => {
  const todaysTasks = useAppSelector(selectTodaysTasks);
  const dispatch = useAppDispatch();
  return (
    <ol className="today-tasks">
      {todaysTasks.map((task) => (
        <li key={task.id} className="task__item">
          <input
            type="checkbox"
            id={`task-check-${task.id}`}
            checked={task.completed}
            onClick={() =>
              dispatch(
                updateStatus({ id: task.id, completed: !task.completed }),
              )
            }
          />
          <label htmlFor={`task-check-${task.id}`}>{task.todo}</label>
        </li>
      ))}
    </ol>
  );
};
