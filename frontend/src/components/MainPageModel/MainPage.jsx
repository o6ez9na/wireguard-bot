import React from "react";
import "./main.css";
import UserParticle from "./UserParticle/UserParticle";
export default function MainPage() {
  return (
    <div className="main-page-wrapper">
      <h1>Admin Panel</h1>
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
        <UserParticle />
        <UserParticle />
        <UserParticle />
        <UserParticle />
      </div>
    </div>
  );
}
