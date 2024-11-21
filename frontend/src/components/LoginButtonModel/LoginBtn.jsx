import React from "react";
import "./btn.css";
export default function LoginBtn() {
  return (
    <button type="submit" className="login-button">
      <div className="wave"></div>
      <span>Log In</span>
    </button>
  );
}
