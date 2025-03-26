import React, { useState } from "react";
// import uncheckAll from "./../../../assets/uncheck.png";
// import completeAllBtn from "./../../../assets/checkMark.png";
import "./CompleteAllBtn.css";
import { useAppDispatch } from "../../../store/hooks";
import { completeAllTasks } from "../../../store/task/taskSlice";
import Tooltip from "../../Tooltip";

export const CompleteAllBtn = () => {
  const [completeAll, setCompleteAll] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + window.scrollY, // Учёт прокрутки страницы
      left: rect.left + rect.width + 5 + window.scrollX, // Чуть правее drag-handle
    });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const dispatch = useAppDispatch();

  const handlerClick = () => {
    setCompleteAll(!completeAll);

    dispatch(completeAllTasks(!completeAll));
  };

  return (
    <div className="complete-all-button__container">
      <button
        className={`complete-all-button__outter ${completeAll ? "completed" : ""}`}
        onClick={handlerClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="btn-circle"></div>
      </button>
      {tooltipVisible && (
        <Tooltip position={tooltipPos} tooltipText="Complete all tasks!" />
      )}
    </div>
  );
};
