import React, { useState, useEffect } from "react";
import "./add_modal.css";

// Модальное окно
export const AddUserModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Модальное окно появляется с анимацией

    return () => {
      setIsVisible(false); // Закрываем модальное окно с анимацией
    };
  }, []);

  return (
    <div className={`add-modal-overlay ${isVisible ? "show" : ""}`}>
      <div className="add-modal-content">
        <h3>Модальное окно</h3>
        <p>Это пример модального окна.</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};
