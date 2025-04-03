import React from "react";
import "./Indicator.css";
import { useSelector } from "react-redux";
import { selectCompletionPercentage } from "../../store/task/taskSelectors";

export const Indicator = () => {
  const completionPercentage = useSelector(selectCompletionPercentage);
  return (
    <div
      className="indicator__container"
      data-progress={completionPercentage.toFixed(0)}
    >
      <div className="indicator">
        <h3 className="percentage-progress">
          {completionPercentage.toFixed(0)}%
        </h3>
        <div
          className="progress"
          style={{ height: `${completionPercentage}%` }}
        />
      </div>
    </div>
  );
};
