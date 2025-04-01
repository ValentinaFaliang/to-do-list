import React from "react";
import "./Indicator.css";
import { useSelector } from "react-redux";
import { selectCompletionPercentage } from "../../store/task/taskSelectors";

export const Indicator = () => {
  const completionPercentage = useSelector(selectCompletionPercentage);
  return (
    <div className="indicator__container">
      <div
        className="progress"
        style={
          {
            "--progress": `${completionPercentage.toFixed(0)}%`,
          } as React.CSSProperties
        }
      />
      <div className="indicator"></div>
    </div>
  );
};
