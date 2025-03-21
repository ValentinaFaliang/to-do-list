import React, { useEffect, useRef } from "react";
import "./ModalInput.css";
import { useAppDispatch } from "../../store/hooks";
import { addTaskLocally } from "../../store/task/taskSlice";

interface ModalInputProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalInput = ({ isOpen, onClose }: ModalInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    if (!inputRef.current || !inputRef.current.value.trim()) return;
    if (inputRef.current) {
      dispatch(addTaskLocally(inputRef.current.value));
    }
    setTimeout(onClose, 100);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        className="modal-backdrop"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-label="Close modal"
        aria-hidden="true"
      />
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className="close-btn__container">
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>
        <input ref={inputRef} type="text" placeholder="Type to do..." />
        <button onClick={() => handleAddTask()} className="add-btn">
          Add
        </button>
      </div>
    </div>
  );
};
