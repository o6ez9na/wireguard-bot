import React, { useState } from "react";
import "../style.css";
import LoginBtn from "../LoginButtonModel/LoginBtn";
import Welcome from "../WelcomeModel/Welcome";
// import ErrorNotification from "../ErrorNotificationModel/ErrorNotification";
import Instance from "../../api/instance/Instance";
export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);
      const response = await Instance.post("/admin/login/", formData, {});

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeUsername = async (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = async (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <div className="auth-page-wrapper">
        <div className="auth-form">
          <Welcome />
          <div>
            <form onSubmit={handleSubmit}>
              <div className="auth-input-control">
                <input
                  type="text"
                  placeholder="Username"
                  className="auth-input-styler-user"
                  onChange={handleChangeUsername}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="auth-input-styler-password"
                  onChange={handleChangePassword}
                />
                <LoginBtn />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
