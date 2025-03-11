import React from "react";
import "./Tooltip.css";
import { createPortal } from "react-dom";

interface TooltipProps {
  position: { top: number; left: number };
}

export const Tooltip = ({ position }: TooltipProps) => {
  return createPortal(
    <div className="tooltip" style={{ top: position.top, left: position.left }}>
      Grab me!
    </div>,
    document.body,
  );
};
