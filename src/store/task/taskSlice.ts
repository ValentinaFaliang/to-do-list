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

    addTaskLocally: (state, action) => {
      const newTask: TaskDaily = {
        id: Date.now(),
        todo: action.payload,
        completed: false,
        userId: 0,
        todaysTask: false,
      };
      state.tasks.push(newTask);
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

export const { updateStatus, moveTask, addTaskLocally } = taskSlice.actions;
export default taskSlice.reducer;
