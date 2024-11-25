import React, { useState } from "react";
import "./main.css";
import UserTable from "./UserTable/UserTable";
import UsersInfo from "./UsersInfo/UsersInfo";

export default function MainPage() {
  return (
    <div className="main-page-wrapper">
      <UsersInfo />
      <div className="main-pannel-with-users">
        <UserTable />
      </div>
    </div>
  );
}
