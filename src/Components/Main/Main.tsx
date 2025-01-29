import React from "react";
import Tasks from "../Tasks";
import "./Main.css";
import CompletedTasks from "../CompletedTasks";

export const Main = () => {
  return (
    <div className="main__container">
      <div className="main__left-container">
        <section className="tasks__container">
          <Tasks tasksDay="Today" />
          <Tasks tasksDay="Week" />
        </section>
      </div>
      <div className="main__right-container">
        <section className="completed-tasks__container">
          <CompletedTasks />
        </section>
      </div>
    </div>
  );
};
