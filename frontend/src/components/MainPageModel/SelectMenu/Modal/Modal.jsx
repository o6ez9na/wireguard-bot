import React, { useEffect, useState, useRef } from "react";
import "./modal.css";
import Instance from "../../../../api/instance/Instance";

const Modal = ({ id, title, message, onDelete, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(onClose, 300);
  };

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await Instance.delete(`/client/${id}/`);
      if (response.status === 204) {
        onDelete(id);
        handleClose();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`modal-overlay ${showModal ? "show" : ""}`}>
      <form className="modal-content" ref={modalRef}>
        {isDeleting ? (
          <div className="modal-loader"></div>
        ) : (
          <>
            <h3>{title}</h3>
            <p>{message}</p>
            <div className="modal-buttons">
              <button
                onClick={handleDelete}
                type="button"
                className="delete-button"
                disabled={isDeleting}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="cancel-button"
                disabled={isDeleting}
              >
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Modal;
