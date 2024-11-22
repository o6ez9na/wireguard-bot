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

  const handleOptionClick = () => {
    setIsOpen(false);
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
              <li>
                <img
                  src={process.env.PUBLIC_URL + "/auth-icons/edit.svg"}
                  alt="Edit Icon"
                  className="menu-icon"
                />
                Edit
              </li>
              <li>
                <img
                  src={process.env.PUBLIC_URL + "/auth-icons/info.svg"}
                  alt="Info Icon"
                  className="menu-icon"
                />
                Info
              </li>
              <li className="option-trash" onClick={() => handleOptionClick()}>
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
          title={"Are you sure?"}
          message={"This user will be deleted once and for all"}
          onClose={closeModal}
          onDelete={handleDelete} // Передаем функцию удаления в Modal
        />
      )}
    </div>
  );
}
