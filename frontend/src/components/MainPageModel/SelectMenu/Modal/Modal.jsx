import React, { useEffect, useState } from "react";
import "./modal.css";

const Modal = ({ title, message, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // Закрытие модального окна
  const handleClose = () => {
    setShowModal(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`modal-overlay ${showModal ? "show" : ""}`}
      onClick={handleClose}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
