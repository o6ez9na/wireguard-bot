import React from "react";
import "./main.css";
import UserTable from "./UserTable/UserTable";

export default function MainPage() {
    return (
        <div className="main-page-wrapper">
            <div className="main-pannel-with-users">
                <UserTable/>
            </div>
        </div>
    );
}
