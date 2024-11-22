import React, { useState } from "react";
import "./main.css";
import UserTable from "./UserTable/UserTable";
import UsersInfo from "./UsersInfo/UsersInfo";
import { AddUserModal } from "./AddUserModal/AddUserModal";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для отображения модального окна
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false); // Состояние для обновления таблицы

  // Открытие модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Функция для обновления данных в таблице
  const updateTable = () => {
    setShouldUpdateTable((prev) => !prev); // Изменяем состояние для триггера перерисовки
  };

  return (
    <div className="main-page-wrapper">
      <UsersInfo />
      <div className="main-pannel-with-users">
        <div className="user-icons">
          <div className="main-icon-user" onClick={openModal}>
            <img
              className="table-icon"
              src={process.env.PUBLIC_URL + "/auth-icons/plus.svg"}
              alt="plus"
            />
          </div>
          <div className="main-icon-user">
            <img
              className="table-icon"
              src={process.env.PUBLIC_URL + "/auth-icons/refresh.svg"}
              alt="refresh"
            />
          </div>
        </div>
        <hr className="main-hr"></hr>
        <UserTable shouldUpdate={shouldUpdateTable} />
        {isModalOpen && (
          <AddUserModal onClose={closeModal} onUserAdded={updateTable} />
        )}
      </div>
    </div>
  );
}
