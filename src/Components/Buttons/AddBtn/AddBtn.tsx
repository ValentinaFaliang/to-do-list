import React, { useState } from "react";
import "./AddBtn.css";
import addBtn from "./../../../assets/add.png";
import ModalInput from "../../ModalInput";

interface AddBtnProps {
  today?: boolean;
}

export const AddBtn = ({ today }: AddBtnProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="add-btn__container">
        <button onClick={() => setOpenModal(true)}>
          <img alt="add button" src={addBtn} />
        </button>
      </div>

      <ModalInput
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        today={today}
      />
    </>
  );
};
