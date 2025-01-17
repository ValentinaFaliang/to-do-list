import React from "react";
import checkIcon from "../../assets/checkMark.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <div className="indicator__container">
        <div className="indicator"></div>
      </div>
      <h1>To-Do List</h1>
      <button>
        <img src={checkIcon} alt="check mark" />
      </button>
    </header>
  );
};
