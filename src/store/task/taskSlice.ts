import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodo, getAllTasks } from "../../services/tasks";
import { Task, TaskDaily } from "../../types/tasks";

export const fetchTasksData = createAsyncThunk(
  "task/fetchTasksData",
  async () => {
    const response = await getAllTasks();
    return response;
  },
);

export const addNewTask = createAsyncThunk(
  "task/addNewTask",
  async ({ todo, userId }: { todo: string; userId: number }) => {
    return await addTodo(todo, userId);
  },
);

interface TaskState {
  tasks: TaskDaily[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TaskState = {
  tasks: [
    {
      id: 0,
      todo: "",
      completed: false,
      userId: 0,
      todaysTask: false,
    },
  ],
  status: "idle",
  error: null,
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
    },
    moveTask: (state, action) => {
      const { id, toCompleted, toTodaysTask } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        if (toCompleted !== undefined) task.completed = toCompleted;
        if (toTodaysTask !== undefined) task.todaysTask = toTodaysTask;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksData.fulfilled, (state, { payload }) => {
        state.tasks = payload.map((task: Task) =>
          task.id % 2 === 0
            ? { ...task, todaysTask: true }
            : { ...task, todaysTask: false },
        );
      })
      .addCase(addNewTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addNewTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const { updateStatus, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
