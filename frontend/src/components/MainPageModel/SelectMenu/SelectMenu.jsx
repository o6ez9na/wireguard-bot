import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./menu.css";

export default function SelectMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const toggleMenu = (event) => {
    const rect = event.target.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom, left: rect.left });
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    console.log(`Вы выбрали: ${option}`);
    setIsOpen(false);
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
                  alt="Edit Icon"
                  className="menu-icon"
                />
                Info
              </li>
              <li onClick={() => handleOptionClick("Option 3")}>
                <img
                  src={process.env.PUBLIC_URL + "/auth-icons/trash.svg"}
                  alt="Edit Icon"
                  className="menu-icon"
                />
                Delete
              </li>
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}
