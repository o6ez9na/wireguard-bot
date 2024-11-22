import React, { useState } from "react";
import "./main.css";
import UserTable from "./UserTable/UserTable";
import UsersInfo from "./UsersInfo/UsersInfo";
import { AddUserModal } from "./AddUserModal/AddUserModal";

export default function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для отображения модального окна

  // Открытие модального окна
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-page-wrapper">
      <UsersInfo />
      <div className="main-pannel-with-users">
        {/* кнопочки */}
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
        <UserTable />
        {/* Отображаем модальное окно, если оно открыто */}
        {isModalOpen && <AddUserModal onClose={closeModal} />}
      </div>
    </div>
  );
}
