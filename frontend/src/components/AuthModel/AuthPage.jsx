import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import LoginBtn from "../LoginButtonModel/LoginBtn";
import Welcome from "../WelcomeModel/Welcome";
import ErrorNotification from "../ErrorNotificationModel/ErrorNotification";
import Instance from "../../api/instance/Instance";

export default function AuthPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await Instance.post("/admin/login/", formData, {});

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message);
      setIsErrorVisible(true);
      setTimeout(() => {
        setIsErrorVisible(false);
      }, 5000);

      // Возвращаем форму в случае ошибки
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="auth-page-wrapper">
        <div className="waves"></div>
        <div className="waves"></div>
        <div className="waves"></div>
        {isErrorVisible && <ErrorNotification text={errorMessage} />}
        <div className="auth-form">
          <Welcome />
          <form onSubmit={handleSubmit}>
            <div className="auth-input-control">
              {!isLoading ? (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="auth-input-styler-user fade-in"
                    onChange={handleChangeUsername}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-input-styler-password fade-in"
                    onChange={handleChangePassword}
                  />
                  <LoginBtn />
                </>
              ) : (
                <div className="loading-spinner fade-in"></div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
