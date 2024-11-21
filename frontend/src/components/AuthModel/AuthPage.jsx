import React from "react";
import "../style.css";
import LoginBtn from "../LoginButtonModel/LoginBtn";
import Welcome from "../WelcomeModel/Welcome";
export default function AuthPage() {
  return (
    <div className="auth-page-wrapper">
      <div className="auth-form">
        <Welcome />
        <div>
          <div className="auth-input-control">
            <input
              type="text"
              placeholder="Username"
              className="auth-input-styler-user"
            />
            <input
              type="text"
              placeholder="Password"
              className="auth-input-styler-password"
            />
            <span className="login"></span>
            <LoginBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
