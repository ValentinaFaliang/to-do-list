import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAllTasks = (state: RootState) => state.task.tasks;

export const selectTodaysTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.todaysTask),
);

export const selectWeekTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => !task.todaysTask),
);
