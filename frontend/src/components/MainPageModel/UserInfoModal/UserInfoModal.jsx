import React, {useState, useEffect} from 'react';
import './info.css'; // Подключаем стили для модального окна

export default function UserInfoModal({id, onClose, user}) {
    const [isVisible, setIsVisible] = useState(false);  // Управляем видимостью модального окна
    const [isClosing, setIsClosing] = useState(false); // Состояние для управления процессом закрытия

    useEffect(() => {
        // Когда компонент монтируется, модалка становится видимой
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

    return (
        <div className={`info-modal-overlay ${isVisible ? 'show' : ''} ${isClosing ? 'closing' : ''}`}>
            <div className="info-modal-content">
                <button onClick={handleClose}>X</button>
                <h2>Информация о пользователе</h2>
                <p className={"text-into-info"}>{user.name}</p>
                <p className={"text-into-info"}>{user.telegram_id}</p>
                <p className={"text-into-info"}>{user.public_key}</p>
                <p className={"text-into-info"}>{user.private_key}</p>
                <p className={"text-into-info"}>{user.config}</p>
                <p className={"text-into-info"}>{user.is_active ? "Активен" : "Деактивирован"} </p>
            </div>
        </div>
    );
}
