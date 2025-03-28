import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./task/taskSlice";

const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});

export default store;

export type AppStore = typeof store;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
