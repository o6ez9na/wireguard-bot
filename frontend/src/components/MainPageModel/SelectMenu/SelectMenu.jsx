import React, { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal/Modal"; // Импортируем компонент модального окна
import "./menu.css";

export default function SelectMenu({ id, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модального окна
  const [modalContent, setModalContent] = useState({ title: "", message: "" }); // Данные для модального окна

  const toggleMenu = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);

    // Устанавливаем данные для модального окна в зависимости от выбранной опции
    if (option === "Option 1") {
      setModalContent({ title: "Edit Option", message: "You clicked Edit." });
    } else if (option === "Option 2") {
      setModalContent({ title: "Info Option", message: "You clicked Info." });
    } else if (option === "Option 3") {
      setModalContent({
        title: "Are you sure?",
        message: "The user will be permanently deleted",
      });
    }

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <div>
      <button className="menu-button" onClick={toggleMenu}>
        &#x22EE;
      </button>
      {isOpen &&
        createPortal(
          <div
            className="dropdown-menu"
            style={{
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              opacity: 1,
              transform: "translateY(0)",
              pointerEvents: "auto",
            }}
          >
            <ul>
              <li onClick={() => handleOptionClick("Option 1")}>
                <img
                  src={process.env.PUBLIC_URL + "/auth-icons/edit.svg"}
                  alt="Edit Icon"
                  className="menu-icon"
                />
                Edit
              </li>
              <li onClick={() => handleOptionClick("Option 2")}>
                <img
                  src={process.env.PUBLIC_URL + "/auth-icons/info.svg"}
                  alt="Info Icon"
                  className="menu-icon"
                />
                Info
              </li>
              <li
                onClick={() => handleOptionClick("Option 3")}
                className="option-trash"
              >
                <img
                  src={process.env.PUBLIC_URL + "/auth-icons/trash.svg"}
                  alt="Trash Icon"
                  className="menu-icon"
                />
                Delete
              </li>
            </ul>
          </div>,
          document.body
        )}

      {/* Показываем модальное окно, если состояние isModalOpen истинно */}
      {isModalOpen && (
        <Modal
          id={id}
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
          onDelete={handleDelete} // Передаем функцию удаления в Modal
        />
      )}
    </div>
  );
}
