import React, { useState } from "react";
import "./AddBtn.css";
import addBtn from "./../../../assets/add.png";
import ModalInput from "../../ModalInput";

export const AddBtn = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="add-btn__container">
        <button onClick={() => setOpenModal(true)}>
          <img alt="add button" src={addBtn} />
        </button>
      </div>

      <ModalInput isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};
