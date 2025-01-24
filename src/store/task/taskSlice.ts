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

interface TaskState {
  tasks: TaskDaily[];
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
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updateStatus: (state, { payload }) => {
      const task = state.tasks.find((t) => t.id === payload.id);
      if (task) {
        task.completed = payload.completed;
      }
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

export const { updateStatus } = taskSlice.actions;
export default taskSlice.reducer;
