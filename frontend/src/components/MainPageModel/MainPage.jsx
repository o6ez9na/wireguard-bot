import React from "react";
import "./main.css";
import UserTable from "./UserTable/UserTable";
import UsersInfo from "./UsersInfo/UsersInfo";
export default function MainPage() {
  return (
    <div className="main-page-wrapper">
      {/* <h1>Admin Panel</h1> */}
      <UsersInfo />
      {/* <Switch /> */}
      <div className="main-pannel-with-users">
        <div className="user-icons">
          <div className="main-icon-user">
            <img
              className="table-icon"
              src={process.env.PUBLIC_URL + "/auth-icons/plus.png"}
              alt="plus"
            />
          </div>
          <div className="main-icon-user">
            <img
              className="table-icon"
              src={process.env.PUBLIC_URL + "/auth-icons/refresh.png"}
              alt="refresh"
            />
          </div>
        </div>
        <UserTable />
      </div>
    </div>
  );
}
