import React, { useState, useEffect } from 'react';
import './info.css'; // Подключаем стили для модального окна

export default function UserInfoModal({ id, onClose, user }) {
    const [isVisible, setIsVisible] = useState(false); // Управляем видимостью модального окна
    const [isClosing, setIsClosing] = useState(false); // Состояние для управления процессом закрытия

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
        // Закрываем модалку только если клик произошёл именно по оверлею
        if (e.target.classList.contains('info-modal-overlay')) {
            handleClose();
        }
    };

    return (
        <div
            className={`info-modal-overlay ${isVisible ? 'show' : ''} ${isClosing ? 'closing' : ''}`}
            onClick={handleOverlayClick} // Обработчик клика по оверлею
        >
            <div className="info-modal-content">
                <div className="add-modal-close" onClick={handleClose}></div>

                <h2>Информация о пользователе</h2>
                <p className="text-into-info">Name: {user.name}</p>
                <p className="text-into-info">Tg ID: {user.telegram_id}</p>
                <p className="text-into-info">Protocol: WG</p>
                <p className="text-into-info">Public Key: {user.public_key}</p>
                <p className="text-into-info">Private Key: {user.private_key}</p>
                <p className="text-into-info">Config: {user.config}</p>
                <p className="text-into-info">Is Active? {user.is_active ? "Yes" : "No"}</p>
            </div>
        </div>
    );
}
