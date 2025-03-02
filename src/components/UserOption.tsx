import { useState, useEffect } from "react";
import "./user.css";
import UserButton from "./UserButton";

interface User {
  id: number;
  name: string;
  grupp: string;
}

const UserOption = () => {
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

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleGruppChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewGrupp(e.target.value);
  };
  const handleDelete = (id: number) => {
    const uppdateUser = user.filter((ind) => ind.id !== id);
    setUser(uppdateUser);
  };

  return (
    <div className="grupper">
      <form action="#" onSubmit={handleAddUser}>
        <label htmlFor="select-grupp">
          <h2>Gå med en grupp</h2>
        </label>
        <br />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value.toUpperCase())}
          placeholder="your namn..."
        />
        <select
          name="select-grupp"
          id="select-grupp"
          value={newGrupp}
          onChange={handleGruppChange}
        >
          <option value="">Välj grupp...</option>
          <option value="Musik">Musik Grupp</option>
          <option value="Spel">Spel Grupp</option>
          <option value="Film">Film Grupp</option>
        </select>
        <button type="submit">Gå med</button>
      </form>
      <div>
        {user.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Grupp: {user.grupp}</p>
            <UserButton
              title="Delete"
              handleButton={() => handleDelete(user.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOption;
