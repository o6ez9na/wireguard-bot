import React, { useState } from "react";
import Switch from "../Switch/Switch";

export default function UserTable() {
  const [data, setData] = useState([
    {
      id: 1,
      menu: "Dashboard",
      enabled: true,
      name: "Alice",
      public_key: "1234",
      private_key: "4321",
      description: "I don't have a description",
    },
    {
      id: 2,
      menu: "Settings",
      enabled: false,
      name: "Bob",
      public_key: "1234",
      private_key: "4321",
      description: "I don't have a description",
    },
    {
      id: 3,
      menu: "Reports",
      enabled: true,
      name: "Charlie",
      public_key: "1234",
      private_key: "4321",
      description: "I don't have a description",
    },
  ]);

  // Функция для обновления состояния переключателя
  const handleSwitchChange = (id, newStatus) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, enabled: newStatus } : row
    );
    setData(updatedData);
  };

  return (
    <div>
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
              <td>{row.menu}</td>
              <td>
                <Switch
                  id={`switch-${row.id}`} // Уникальный id для каждого переключателя
                  checked={row.enabled}
                  onChange={(newStatus) =>
                    handleSwitchChange(row.id, newStatus)
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
