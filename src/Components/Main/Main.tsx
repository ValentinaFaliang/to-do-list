import React from "react";
import Tasks from "../Tasks";
import "./Main.css";

export const Main = () => {
  return (
    <div className="main">
      <div className="main__container">
        <div className="main__left-container">
          <section className="tasks__container">
            <Tasks tasksDay="Today" />
            <Tasks tasksDay="Week" />
          </section>
        </div>
        <div className="main__right-container">
          <section className="tasks-status">
            <section className="completed-tasks"></section>
            <section className="pending-tasks"></section>
          </section>
          <section className="notes"></section>
        </div>
      </div>
    </div>
  );
};
