import React, { useState, useEffect } from "react";
import "./add_modal.css";

// Модальное окно
export const AddUserModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Плавное появление модального окна
  useEffect(() => {
    setIsVisible(true);

    return () => {
      // Плавное исчезновение
      setIsVisible(false);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Запускаем процесс исчезновения
    setTimeout(() => {
      onClose(); // Закрываем окно только после завершения анимации
    }, 300); // 300 ms – время, соответствующее продолжительности анимации
  };

  return (
    <div className={`add-modal-overlay ${isVisible ? "show" : ""}`}>
      <div className="add-modal-content">
        <h3>Модальное окно</h3>
        <p>Это пример модального окна.</p>
        <button onClick={handleClose}>Закрыть</button>
      </div>
    </div>
  );
};
