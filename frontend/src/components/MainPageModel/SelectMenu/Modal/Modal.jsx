import React, { useEffect, useState, useRef } from "react";
import "./modal.css";
import Instance from "../../../../api/instance/Instance";

const Modal = ({ id, title, message, onDelete, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef(null); // Реф для модального окна

  useEffect(() => {
    setShowModal(true);
  }, []);

  // Закрытие модального окна с задержкой
  const handleClose = () => {
    setShowModal(false);
    setTimeout(onClose, 300); // Закрытие с задержкой
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await Instance.delete(`/client/${id}/`);
      if (response.status === 204) {
        onDelete(id); // Обновляем данные родительского компонента после успешного удаления
        handleClose();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsDeleting(false); // Важно, чтобы спиннер скрывался, даже если произошла ошибка
    }
  };

  // Закрытие модалки при клике вне её
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  // Добавляем и удаляем обработчик кликов при монтировании и размонтировании компонента
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`modal-overlay ${showModal ? "show" : ""}`}>
      <form className="modal-content" ref={modalRef}>
        {isDeleting ? (
          <div className="modal-loader"></div>
        ) : (
          <>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="modal-buttons">
              <button
                onClick={handleDelete}
                type="button"
                className="delete-button"
                disabled={isDeleting} // Блокируем кнопку во время удаления
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="cancel-button"
                disabled={isDeleting}
              >
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Modal;
