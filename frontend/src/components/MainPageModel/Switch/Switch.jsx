import React from "react";
import "./switch.css";
import Instance from "../../../api/instance/Instance"; // Импорт вашего API клиента

export default function Switch({ user, checked, onChange }) {
  const handleToggle = async () => {
    const newStatus = !checked; // Новое состояние переключателя
    onChange(user, newStatus); // Передаем объект пользователя и новое состояние
    try {
      // Отправляем PUT запрос на сервер
      await Instance.put(`/client/${user.id}/`, {
        id: user.id,
        name: user.name,
        telegram_id: user.telegram_id,
        public_key: user.public_key,
        private_key: user.private_key,
        description: user.description,
        is_active: newStatus,
        config: user.config,
      });

      // После успешного запроса, обновляем состояние в родительском компоненте
    } catch (error) {
      console.error("Ошибка при обновлении переключателя:", error);
    }
  };

  return (
    <div>
      <div className="switch-container">
        <input
          type="checkbox"
          id={user.id} // Уникальный id для каждого переключателя
          checked={checked}
          onChange={handleToggle}
        />
        <label htmlFor={user.id} className="switch-button"></label>
      </div>
    </div>
  );
}
