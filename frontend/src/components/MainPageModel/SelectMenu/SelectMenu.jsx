import React, {useState, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import Modal from "./Modal/Modal";
import "./menu.css";
import UserInfoModal from "../UserInfoModal/UserInfoModal";

export default function SelectMenu({
                                       id,
                                       openMenuId,
                                       setOpenMenuId,
                                       onDelete,
                                        user,
                                   }) {
    const [menuPosition, setMenuPosition] = useState({top: 0, left: 0});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const modalRef = useRef(null); // Реф для модального окна
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const isOpen = openMenuId === id;

    const toggleMenu = () => {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({top: rect.bottom + window.scrollY, left: rect.left});

        if (isOpen) {
            setOpenMenuId(null);
        } else {
            setOpenMenuId(id);
        }
    };

    const handleInfoClick = () => {
        setOpenMenuId(null);
        setIsInfoOpen(true);
    }

    const handleOptionClick = () => {
        setOpenMenuId(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsInfoOpen(false);
    };

    const handleDelete = () => {
        onDelete(id);
        closeModal();
    };

    const handleClickOutside = (event) => {
        // Закрываем меню, если кликнули вне его
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenuId(null);
        }

        // Закрываем модалку, если кликнули вне ее
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleScroll = () => {
        if (isOpen) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({top: rect.bottom + window.scrollY, left: rect.left});
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    return (
        <div>
            <button ref={buttonRef} className="menu-button" onClick={toggleMenu}>
                &#x22EE;
            </button>
            {isOpen &&
                createPortal(
                    <div
                        ref={menuRef}
                        className="dropdown-menu"
                        style={{
                            position: "absolute",
                            top: `${menuPosition.top}px`,
                            left: `${menuPosition.left}px`,
                            opacity: 1,
                            transform: "translateY(0)",
                            pointerEvents: "auto",
                        }}
                    >
                        <ul>
                            <li>
                                <img
                                    src={process.env.PUBLIC_URL + "/auth-icons/edit.svg"}
                                    alt="Edit Icon"
                                    className="menu-icon"
                                />
                                Edit
                            </li>
                            <li onClick={() => handleInfoClick()}>
                                <img
                                    src={process.env.PUBLIC_URL + "/auth-icons/info.svg"}
                                    alt="Info Icon"
                                    className="menu-icon"
                                />
                                Info
                            </li>
                            <li className="option-trash" onClick={() => handleOptionClick()}>
                                <img
                                    src={process.env.PUBLIC_URL + "/auth-icons/trash.svg"}
                                    alt="Trash Icon"
                                    className="menu-icon"
                                />
                                Delete
                            </li>
                        </ul>
                    </div>,
                    document.body // Рендерим выпадающее меню в body
                )}
            {
                isInfoOpen && createPortal(
                    <UserInfoModal
                        // ref={modalRef}
                        id={id}
                        user={user}
                        onClose={closeModal}

                    />,
                    document.body
                )
            }
            {isModalOpen &&
                createPortal(
                    <Modal
                        ref={modalRef} // Передаем ref модальному окну
                        id={id}
                        title={"Are you sure?"}
                        message={"This user will be deleted once and for all"}
                        onClose={closeModal}
                        onDelete={handleDelete}
                    />,
                    document.body // Рендерим модалку в body
                )}
        </div>
    );
}
