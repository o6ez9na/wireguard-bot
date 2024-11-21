import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import LoginBtn from "../LoginButtonModel/LoginBtn";
import Welcome from "../WelcomeModel/Welcome";
import ErrorNotification from "../ErrorNotificationModel/ErrorNotification";
import Instance from "../../api/instance/Instance";
import { setCookie } from "../../helpers/cookies";

export default function AuthPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Запускаем анимацию исчезновения формы
    setIsFadingOut(true);

    // Ждем окончания анимации
    setTimeout(() => {
      setIsLoading(true); // Отображаем спиннер после исчезновения формы
      setIsFadingOut(false); // Сбрасываем состояние анимации

      // Выполняем запрос
      submitLogin();
    }, 500); // Время должно совпадать с CSS анимацией
  };

  const submitLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await Instance.post("/admin/login/", formData, {});
      setCookie("access", response.data.access);
      setCookie("refresh", response.data.refresh);

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message);
      setIsErrorVisible(true);

      // Показываем ошибку и возвращаем форму
      setIsLoading(false);

      setTimeout(() => {
        setIsErrorVisible(false);
      }, 5000);
    }
  };

  const handleChangeUsername = (e) => setUsername(e.target.value);

  const handleChangePassword = (e) => setPassword(e.target.value);

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
            <div
              className={`auth-input-control ${
                isFadingOut ? "fade-out" : isLoading ? "fade-in" : ""
              }`}
            >
              {!isLoading ? (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    className="auth-input-styler-user"
                    value={username}
                    onChange={handleChangeUsername}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-input-styler-password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <LoginBtn />
                </>
              ) : (
                <div className="loading-spinner"></div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
