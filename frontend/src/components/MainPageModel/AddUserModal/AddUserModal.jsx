import React, { useState, useEffect, useRef } from "react";
import "./add_modal.css";
import Instance from "../../../api/instance/Instance";

// Модальное окно
export const AddUserModal = ({ onClose, onUserAdded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [tg_id, setTg_id] = useState("");
  const [pubkey, setPubkey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [config, setConfig] = useState("");
  const modalRef = useRef(null); // Реф для модального окна

  const handleChangeTg_id = (e) => setTg_id(e.target.value);
  const handleChangeConfig = (e) => setConfig(e.target.value);
  const handleChangePrivateKey = (e) => setPrivateKey(e.target.value);
  const handleChangePubkey = (e) => setPubkey(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeUsername = (e) => setUsername(e.target.value);

  // Функция отправки данных
  const handleSubmit = async () => {
    try {
      const response = await Instance.post("/client/create", {
        name: username,
        description: description,
        telegram_id: tg_id,
        public_key: pubkey,
        private_key: privateKey,
        config: config,
        is_active: true,
      });
      console.log("User added successfully", response.data);
      // После успешного добавления вызываем onUserAdded для обновления таблицы
      onUserAdded();
      handleClose();
    } catch (e) {
      console.error("Ошибка при добавлении пользователя:", e);
    }
  };

  // Плавное появление и исчезновение
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Плавное исчезновение
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Запускаем процесс исчезновения
    setTimeout(() => {
      onClose(); // Закрываем окно после завершения анимации
    }, 300); // 300 ms – время, соответствующее продолжительности анимации
  };

  // Закрытие модального окна при клике вне его
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
    <div className={`add-modal-overlay ${isVisible ? "show" : ""}`}>
      <div className="add-modal-content" ref={modalRef}>
        {/* Кнопка закрытия */}
        <div className="add-modal-close" onClick={handleClose}></div>
        <h3>Add User</h3>
        <div className="modal-input-controller">
          <input
            type="text"
            placeholder="Username"
            className="modal-input-styler user"
            onChange={handleChangeUsername}
          />
          <input
            type="text"
            placeholder="Description"
            className="modal-input-styler description"
            onChange={handleChangeDescription}
          />
          <input
            type="text"
            placeholder="Telegram Id"
            className="modal-input-styler tg"
            onChange={handleChangeTg_id}
          />
          <input
            type="text"
            placeholder="Public Key"
            className="modal-input-styler public"
            onChange={handleChangePubkey}
          />
          <input
            type="text"
            placeholder="Private Key"
            className="modal-input-styler private"
            onChange={handleChangePrivateKey}
          />
          <input
            type="text"
            placeholder="Config"
            className="modal-input-styler config"
            onChange={handleChangeConfig}
          />
        </div>
        {/* Кнопка для отправки данных */}
        <div className="add-modal-button-submit" onClick={handleSubmit}>
          Добавить
        </div>
      </div>
    </div>
  );
};
