import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTasksData, updateStatus } from "../../store/task/taskSlice";
import {
  selectTodaysTasks,
  selectWeekTasks,
} from "../../store/task/taskSelectors";
import { Task } from "../../types/tasks";
import "./Tasks.css";

interface TasksProps {
  tasksDay: string;
}
export const Tasks = ({ tasksDay }: TasksProps) => {
  const dispatch = useAppDispatch();
  const todaysTasks = useAppSelector(selectTodaysTasks);
  const weekTasks = useAppSelector(selectWeekTasks);
  let day: Task[];

  if (tasksDay === "Today") {
    day = todaysTasks;
  } else {
    day = weekTasks;
  }

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  return (
    <div className="tasks__outer-container">
      <section className="tasks">
        <h2>{`${tasksDay}'s tasks`}</h2>
        <ul className="tasks__list">
          {day.map((task) => (
            <li key={task.id}>
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
              <label
                htmlFor={`task-check-${task.id}`}
                style={task.completed ? { textDecoration: "line-through" } : {}}
              >
                {task.todo}
              </label>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
