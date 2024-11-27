import React, { useState, useEffect, useRef } from "react";
import "./add_modal.css";
import Instance from "../../../api/instance/Instance";
import GenerateCertsForUser from "../GenerateCertsForUser/GenerateCertsForUser";

export const AddUserModal = ({ onClose, onUserAdded }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [tg_id, setTg_id] = useState("");
  const [pubkey, setPubkey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [presharedKey, setPresharedKey] = useState("");
  const modalRef = useRef(null);
  const config = "пусто"
  const handleChangeTg_id = (e) => setTg_id(e.target.value);
  const handleChangePrivateKey = (e) => setPrivateKey(e.target.value);
  const handleChangePubkey = (e) => setPubkey(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeUsername = (e) => setUsername(e.target.value);

  const handleSubmit = async () => {
    try {
      await Instance.post("/client/create", {
        name: username,
        description: description,
        telegram_id: tg_id,
        public_key: pubkey,
        private_key: privateKey,
        preshared_key: presharedKey,
        config: config,
        is_active: true,
      });
      onUserAdded();
      handleClose();
    } catch (e) {
      console.error("Ошибка при добавлении пользователя:", e);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
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
    <div className={`add-modal-overlay ${isVisible ? "show" : ""}`}>
      <div className="add-modal-content" ref={modalRef}>
        <div className="add-modal-close" onClick={handleClose}></div>
        <h3>Add User</h3>
        <div className="modal-input-controller">
          <input
            type="text"
            placeholder="Username"
            className="modal-input-styler user"
            onChange={handleChangeUsername}
          />
          <input
            type="text"
            placeholder="Description"
            className="modal-input-styler description"
            onChange={handleChangeDescription}
          />
          <input
            type="text"
            placeholder="Telegram Id"
            className="modal-input-styler tg"
            onChange={handleChangeTg_id}
          />
          <input
            type="text"
            placeholder="Public Key"
            value={pubkey}
            className="modal-input-styler public"
            onChange={handleChangePubkey}
          />
          <input
            type="text"
            placeholder="Private Key"
            value={privateKey}
            className="modal-input-styler private"
            onChange={handleChangePrivateKey}
          />
          <GenerateCertsForUser
          setPub={setPubkey}
          setPrivate={setPrivateKey}
          setPresharedKey={setPresharedKey}
          />
        </div>
        <div className="add-modal-overlay-button add-modal-button-submit" onClick={handleSubmit}>
          Добавить
        </div>
      </div>
    </div>
  );
};
