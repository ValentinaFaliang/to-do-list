import React from "react";
import "./Main.css";

export const Main = () => {
  return (
    <main className="main">
      <div className="main__container">
        <div className="main__left-container">
          <section className="today-tasks"></section>
          <section className="week-tasks"></section>
        </div>
        <div className="main__right-container">
          <section className="tasks-status">
            <section className="completed-tasks"></section>
            <section className="pending-tasks"></section>
          </section>
          <section className="notes"></section>
        </div>
      </div>
    </main>
  );
};
