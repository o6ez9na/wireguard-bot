import React from "react";
import "./switch.css";

export default function Switch({ id, checked, onChange }) {
  const handleToggle = () => {
    onChange(!checked); // Передаем новое состояние в родительский компонент
  };

  return (
    <div>
      <div className="switch-container">
        <input
          type="checkbox"
          id={id} // Уникальный id для каждого переключателя
          checked={checked}
          onChange={handleToggle}
        />
        <label htmlFor={id} className="switch-button"></label>
      </div>
    </div>
  );
}
