import React from "react";
import "./Header.css";
import CompleteAllBtn from "../Buttons/CompleteAllBtn";
import Indicator from "../Indicator";
import TaskSearch from "../TaskSearch";

export const Header = () => {
  return (
    <div className="header">
      <section className="header__top">
        <div className="header__top__left"></div>
        <div className="header__top__right"></div>
      </section>
      <section className="header__middle">
        <Indicator />
        <div className="title__container">
          <h1>To-Do List</h1>
        </div>
        <CompleteAllBtn />
        <div className="search__container">
          <TaskSearch />
        </div>
      </section>
    </div>
  );
};
