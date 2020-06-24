import React, { useState, useEffect } from "react";
import axios from "axios";

export const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8001/users");
    setUsers(response.data);
  };

  const addUser = async () => {
    try {
      await axios.post("http://localhost:8001/users", { name: name });
    } catch (e) {
      console.log("Something went wrong with posting");
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8001/users/${id}`);
  };

  return (
    <>
      <div>
        <h1>Fetch users manually:</h1>
        <button onClick={getUsers}>Fetch users manually</button>
      </div>
      <div>
        <h1>User list:</h1>
        {users.map((user, index) => (
          <div key={index}>
            <span>{user.username}</span>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <h1>Add user:</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addUser}>Add user</button>
      </div>
    </>
  );
};
