import React, { useState, useEffect } from "react";
import Switch from "../Switch/Switch";
import Instance from "../../../api/instance/Instance";
import SelectMenu from "../SelectMenu/SelectMenu";

export default function UserTable({ shouldUpdate }) {
  const [data, setData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Функция для загрузки данных из базы
  const fetchData = async () => {
    try {
      const response = await Instance.get("/client");
      setData(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  // Загружаем данные при монтировании компонента и при изменении shouldUpdate
  useEffect(() => {
    fetchData();
  }, [shouldUpdate]); // fetchData будет вызываться при каждом изменении shouldUpdate

  // Обновление состояния в родительском компоненте при изменении статуса переключателя
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
    <div className="table-wrapper">
      <table className="user-table-wrapper">
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
    </div>
  );
}
