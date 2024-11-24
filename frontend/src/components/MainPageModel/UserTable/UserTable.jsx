import React, { useState, useEffect } from "react";
import Switch from "../Switch/Switch";
import Instance from "../../../api/instance/Instance";
import SelectMenu from "../SelectMenu/SelectMenu";
import { AddUserModal } from "../AddUserModal/AddUserModal";

export default function UserTable() {
  const [data, setData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для отображения модального окна
  const [shouldUpdate, setShouldUpdateTable] = useState(false); // Состояние для обновления таблицы

  const fetchData = async () => {
    try {
      setIsTableVisible(false);
      setIsLoading(true);
      const response = await Instance.get("/client");
      setData(response.data);
      setIsLoading(false);
      setTimeout(() => setIsTableVisible(true), 100);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [shouldUpdate]);

  const updateTable = () => {
    setShouldUpdateTable((prev) => !prev); // Изменяем состояние для триггера перерисовки
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSwitchChange = (user, newStatus) => {
    const updatedData = data.map((row) =>
      row.id === user.id ? { ...row, is_active: newStatus } : row
    );
    setData(updatedData);
  };

  // Функция для удаления пользователя
  const handleDeleteUser = (id) => {
    // Удаляем пользователя из таблицы
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  return (
    <>
      <div className="user-icons">
        <div className="main-icon-user" onClick={openModal}>
          <img
            className="table-icon"
            src={process.env.PUBLIC_URL + "/auth-icons/plus.svg"}
            alt="plus"
          />
        </div>
        <div className="main-icon-user" onClick={fetchData}>
          <img
            className="table-icon"
            src={process.env.PUBLIC_URL + "/auth-icons/refresh.svg"}
            alt="refresh"
          />
        </div>
      </div>
      <hr className="main-hr"></hr>

      <div className="table-wrapper">
        {!isLoading ? (
          <table
            className={`user-table-wrapper ${
              isTableVisible ? "visible-table" : ""
            }`}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Menu</th>
                <th>Enabled</th>
                <th>Name</th>
                <th>Private key</th>
                <th>Public key</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <SelectMenu
                      id={row.id}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                      onDelete={handleDeleteUser}
                    />
                  </td>

                  <td>
                    <Switch
                      user={row} // Передаем весь объект пользователя
                      checked={row.is_active} // Убедитесь, что это свойство верно
                      onChange={(user, newStatus) =>
                        handleSwitchChange(user, newStatus)
                      }
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>{row.public_key}</td>
                  <td>{row.private_key}</td>
                  <td>{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="loading-spinner-wrapper">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <AddUserModal onClose={closeModal} onUserAdded={updateTable} />
      )}
    </>
  );
}
