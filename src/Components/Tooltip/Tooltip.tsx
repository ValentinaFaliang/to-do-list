import React from "react";
import "./Tooltip.css";
import { createPortal } from "react-dom";

interface TooltipProps {
  position: { top: number; left: number };
  tooltipText: string;
}

export const Tooltip = ({ position, tooltipText }: TooltipProps) => {
  return createPortal(
    <div className="tooltip" style={{ top: position.top, left: position.left }}>
      {tooltipText}
    </div>,
    document.body,
  );
};
