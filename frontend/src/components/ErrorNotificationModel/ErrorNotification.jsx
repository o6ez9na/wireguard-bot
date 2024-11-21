import React from "react";
import "./error.css";

export default function ErrorNotification(props) {
  return <div className="error-wrapper show">{props.text}</div>;
}
