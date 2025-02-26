import { useState, useEffect } from "react";
import UserButton from "./UserButton";
import "./user.css";
import Resa from "../gruppar/Resa";
import Musik from "../gruppar/Musik";
import Spel from "../gruppar/Spel";

interface User {
  id: number;
  name: string;
  grupp: string;
}

const UserList = () => {
  const [user, setUser] = useState<User[]>([]);
  const [newName, setNewName] = useState("");
  const [newGrupp, setNewGrupp] = useState("");

  // Hämta användare från localStorage vid första rendering
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUser(JSON.parse(savedUsers));
    }
  }, []);

  // Uppdatera localStorage när användarlistan ändras
  useEffect(() => {
    if (user.length > 0) {
      localStorage.setItem("users", JSON.stringify(user));
    }
  }, [user]);

  const handleAddUser = () => {
    if (newName.trim() === "" || newGrupp.trim() === "") return;

    const newUser = {
      id: user.length > 0 ? user[user.length - 1].id + 1 : 1,
      name: newName,
      grupp: newGrupp.toUpperCase(),
    };

    setUser([...user, newUser]);
    setNewName("");
    setNewGrupp("");
  };

  const DeleteHandleClick = (id: number) => {
    const updatedUsers = user.filter((person) => person.id !== id);
    setUser(updatedUsers);
  };
  const handleEditUser = (id: number, newGrupp: string) => {
    setUser(
      user.map((u) =>
        u.id === id ? { ...u, grupp: newGrupp.toUpperCase() } : u
      )
    );
  };

  return (
    <div className="wrap">
      <h2>Gå med en grupp</h2>
      <section className="user-list">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value.toUpperCase())}
          placeholder="Skriv namn..."
        />
        <input
          type="text"
          value={newGrupp}
          onChange={(e) => setNewGrupp(e.target.value.toUpperCase())}
          placeholder="Skriv grupp..."
        />
        <UserButton handleButton={handleAddUser} title="Done" />
        {/*  <UserButton handleButton={() => handleEditUser(u.id, u.grupp)} title="Edit" /> */}
      </section>

      <section className="grupp">
        <Resa
          users={user.filter((u) => u.grupp === "RESA")}
          onDelete={DeleteHandleClick}
        />
        <Musik
          users={user.filter((u) => u.grupp === "MUSIK")}
          onDelete={DeleteHandleClick}
        />
        <Spel
          users={user.filter((u) => u.grupp === "SPEL")}
          onDelete={DeleteHandleClick}
          onEdit={handleEditUser}
        />
      </section>
    </div>
  );
};

export default UserList;
