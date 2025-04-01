import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectAllTasks = (state: RootState) => state.task.tasks;

export const selectTodaysTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.todaysTask),
);

export const selectWeekTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => !task.todaysTask),
);

export const selectCompletedTasks = createSelector(selectAllTasks, (tasks) =>
  tasks.filter((task) => task.completed),
);

export const selectCompletionPercentage = createSelector(
  [selectAllTasks, selectCompletedTasks],
  (allTasks, completedTasks) =>
    allTasks.length > 0 ? (completedTasks.length / allTasks.length) * 100 : 0,
);
