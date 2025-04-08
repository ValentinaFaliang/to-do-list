import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchTasksData } from "../../store/task/taskSlice";
import { Task } from "../../types/tasks";
import "./Tasks.css";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "../TaskItem";
import AddBtn from "../Buttons/AddBtn";

interface TasksProps {
  tasks: Task[];
  today: boolean;
}
export const Tasks = ({ tasks, today }: TasksProps) => {
  const dispatch = useAppDispatch();
  const { setNodeRef } = useDroppable({
    id: today ? "todays-tasks" : "weeks-tasks",
  });

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  return (
    <div className="tasks__outer-container">
      <section className="tasks" ref={setNodeRef}>
        <div className="tasks-header">
          <h2>{today ? `Today's Tasks` : `Week's Tasks`}</h2>
          <AddBtn today={today} />
        </div>

        <div className="tasks__inner-container">
          <ul className="tasks__list">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={{ ...task }} data={{ task }} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
