import React, { useState } from "react";
import Tasks from "../Tasks";
import "./Main.css";
import CompletedTasks from "../CompletedTasks";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { moveTask } from "../../store/task/taskSlice";
import TaskItem from "../TaskItem";
import { Task } from "../../types/tasks";
import { createPortal } from "react-dom";

export const Main = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.task.tasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    if (over.id === "completed-tasks") {
      dispatch(moveTask({ id: taskId, toCompleted: true }));
    } else if (over.id === "todays-tasks") {
      dispatch(
        moveTask({ id: taskId, toCompleted: false, toTodaysTask: true }),
      );
    } else if (over.id === "weeks-tasks") {
      dispatch(
        moveTask({ id: taskId, toCompleted: false, toTodaysTask: false }),
      );
    }
    setActiveTask(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task;
    setActiveTask(task || null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="main__container">
        <div className="main__left-container">
          <section className="tasks__container">
            <Tasks
              tasks={tasks.filter((t) => !t.completed && t.todaysTask)}
              today={true}
            />
            <Tasks
              tasks={tasks.filter((t) => !t.completed && !t.todaysTask)}
              today={false}
            />
          </section>
        </div>
        <div className="main__right-container">
          <section className="completed-tasks__container">
            <CompletedTasks tasks={tasks.filter((t) => t.completed)} />
          </section>
        </div>
      </div>
      {createPortal(
        <DragOverlay className="dnd-overlay">
          {activeTask ? <TaskItem task={activeTask} /> : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
