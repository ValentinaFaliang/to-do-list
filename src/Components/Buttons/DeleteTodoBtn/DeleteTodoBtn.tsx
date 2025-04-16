import React from "react";
import deleteBtn from "./../../../assets/delete.png";
import "./DeleteTodoBtn.css";
import { useAppDispatch } from "../../../store/hooks";
import { deleteTask } from "../../../store/task/taskSlice";

interface DeleteTodoBtnProps {
  id: number;
}

export const DeleteTodoBtn = ({ id }: DeleteTodoBtnProps) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    dispatch(deleteTask({ id }));
  };
  return (
    <button className="delete-btn" onClick={handleDelete}>
      <img src={deleteBtn} alt="delete-button" />
    </button>
  );
};
