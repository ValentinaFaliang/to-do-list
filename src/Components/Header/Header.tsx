import React from "react";
import checkAllBtn from "./../../assets/checkMark.png";
import "./Header.css";

export const Header = () => {
  return (
    <div className="header">
      <section className="header__top">
        <div className="header__top__left"></div>
        <div className="header__top__right"></div>
      </section>
      <section className="header__middle">
        <div className="indicator__container">
          <div className="indicator">
            {/* процент на сколько выполнены задачи */}
          </div>
        </div>
        <div className="title__container">
          <h1>To-Do List</h1>
        </div>
        <div className="button__container">
          <button>
            <img src={checkAllBtn} alt="check mark" />
          </button>
        </div>
      </section>
    </div>
  );
};
