import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllTasks } from "../../services/tasks";
import { Task, TaskDaily } from "../../types/tasks";

export const fetchTasksData = createAsyncThunk(
  "task/fetchTasksData",
  async () => {
    const response = await getAllTasks();
    return response;
  },
);

const storedTasks = localStorage.getItem("tasks");

interface TaskState {
  tasks: TaskDaily[];
  searchQuery: string;
}

const initialState: TaskState = {
  tasks: storedTasks
    ? JSON.parse(storedTasks).map((task: Task) => ({
        ...task,
        todaysTask: "todaysTask" in task ? task.todaysTask : false,
      }))
    : [],
  searchQuery: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateStatus: (state, { payload }) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id
          ? { ...task, completed: payload.completed }
          : task,
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    moveTask: (state, action) => {
      const { id, toCompleted, toTodaysTask } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        if (toCompleted !== undefined) task.completed = toCompleted;
        if (toTodaysTask !== undefined) task.todaysTask = toTodaysTask;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    addTaskLocally: (state, action) => {
      const newTask: TaskDaily = {
        id: Date.now(),
        todo: action.payload.value,
        completed: false,
        userId: 0,
        todaysTask: action.payload.today,
      };
      const updatedTasks = [...state.tasks, newTask];
      state.tasks = updatedTasks;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    },

    deleteTask: (state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    completeAllTasks: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => ({
        ...task,
        completed: payload,
      }));
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTasksData.fulfilled, (state, { payload }) => {
      state.tasks = payload.map((task: Task) =>
        task.id % 2 === 0
          ? { ...task, todaysTask: true }
          : { ...task, todaysTask: false },
      );
    });
  },
});

export const {
  updateStatus,
  moveTask,
  addTaskLocally,
  deleteTask,
  completeAllTasks,
  setSearchQuery,
} = taskSlice.actions;
export default taskSlice.reducer;
