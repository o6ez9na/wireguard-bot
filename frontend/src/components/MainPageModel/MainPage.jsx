import React, { useState } from "react";
import "./main.css";
import UserTable from "./UserTable/UserTable";
import UsersInfo from "./UsersInfo/UsersInfo";

export default function MainPage() {
  // Открытие модального окна

  // Закрытие модального окна

  // Функция для обновления данных в таблице

  return (
    <div className="main-page-wrapper">
      <UsersInfo />
      <div className="main-pannel-with-users">
        <UserTable />
      </div>
    </div>
  );
}
