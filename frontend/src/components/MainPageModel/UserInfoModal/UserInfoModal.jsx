import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Импортируем QRCodeCanvas
import "./info.css";

export default function UserInfoModal({ id, onClose, user }) {
    const [isVisible, setIsVisible] = useState(false); // Управляем видимостью модального окна
    const [isClosing, setIsClosing] = useState(false); // Состояние для управления процессом закрытия
    const [showQRCode, setShowQRCode] = useState(false); // Состояние для отображения QR-кода

    useEffect(() => {
        setIsVisible(true);

        return () => {
            setIsClosing(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
        };
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("info-modal-overlay")) {
            handleClose();
        }
    };

    return (
        <div
            className={`info-modal-overlay ${isVisible ? "show" : ""} ${isClosing ? "closing" : ""}`}
            onClick={handleOverlayClick}
        >
            <div className="info-modal-content">
                <div className="add-modal-close" onClick={handleClose}></div>

                <h2>About:</h2>
                <div className={"info-user-status"}>
                    <div>
                        <h3>Name:</h3>
                        <pre className={"config-box"}>{user.name}</pre>
                    </div>
                    <div>
                        <h3>Is Active?</h3>
                        <pre className={"config-box"}>{user.is_active ? "Yes" : "No"}</pre>
                    </div>
                </div>
                <h3>Telegram Id:</h3>
                <pre className={"config-box"}>{user.telegram_id}</pre>
                <h3>Proto:</h3>
                <pre className={"config-box"}>WG</pre>
                <div className={"info-user-status"}>
                    <div className={"max-width-config-box"}>
                        <h3>Public Key</h3>
                        <pre className={"config-box text-into-info"}>{user.public_key}</pre>
                    </div>
                    <div className={"max-width-config-box"}>
                        <h3>Private Key</h3>
                        <pre className={"config-box text-into-info"}>{user.private_key}</pre>
                    </div>
                    <div className={"max-width-config-box"}>
                        <h3>Preshared Key</h3>
                        <pre className={"config-box text-into-info"}>{user.preshared_key}</pre>
                    </div>
                </div>
                <div style={{ position: "relative" }}>
                    <h3>Config:</h3>
                    <pre className="config-box">
                        <div className={"buttons-config-box"}>
                            <div>
                                <button
                                    className="copy"
                                    onClick={() => navigator.clipboard.writeText(user.config)}
                                >
                                    <img
                                        className={"copy-icon"}
                                        src={process.env.PUBLIC_URL + "/auth-icons/copy.png"}
                                        alt={"icon"}
                                    ></img>
                                </button>
                            </div>
                            <div>
                                <button
                                    className={"qr"}
                                    onClick={() => setShowQRCode(!showQRCode)}
                                >
                                    <img
                                        className={"qr-icon"}
                                        src={process.env.PUBLIC_URL + "/auth-icons/qr-code.png"}
                                        alt={"qr"}
                                    ></img>
                                </button>
                            </div>
                        </div>
                        {showQRCode ? (
                            <div className="qr-container">
                                <QRCodeCanvas value={user.config} size={170} />
                            </div>
                        ) : (
                            user.config
                        )}
                    </pre>
                </div>
            </div>
        </div>
    );
}
