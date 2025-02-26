import UserButton from "../components/UserButton";
import { useState } from "react";
import "../App.css";
interface User {
  id: number;
  name: string;
  grupp: string;
}

interface SpelProps {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newGrupp: string) => void;
}

const Spel = ({ users, onDelete, onEdit }: SpelProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newGrupp, setNewGrupp] = useState<string>("");

  const toggle = () => {
    setVisible(!visible);
  };

  const handleEditClick = (user: User) => {
    setEditingUserId(user.id);
    setNewGrupp(user.grupp);
  };

  const handleSave = (id: number) => {
    onEdit(id, newGrupp);
    setEditingUserId(null);
  };

  return (
    <div className="UserComponent">
      <UserButton
        handleButton={toggle}
        title={visible ? "Close Grupp" : "Spel Grupp"}
      />

      {visible ? (
        users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="UserStyle">
              <p>Name: {user.name}</p>

              {editingUserId === user.id ? (
                <div>
                  <input
                    type="text"
                    placeholder="Skriv grupp..."
                    value={newGrupp}
                    onChange={(e) => setNewGrupp(e.target.value)}
                  />
                  <UserButton
                    handleButton={() => handleSave(user.id)}
                    title="Save"
                  />
                  <UserButton
                    handleButton={() => setEditingUserId(null)}
                    title="Cancel"
                  />
                </div>
              ) : (
                <p>
                  Grupp: {user.grupp}{" "}
                  <UserButton
                    handleButton={() => handleEditClick(user)}
                    title="Edit"
                  />
                </p>
              )}

              <UserButton
                handleButton={() => onDelete(user.id)}
                title="Delete"
              />
            </div>
          ))
        ) : (
          <p className="userEmty">Inga användare i Resa-gruppen.</p>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Spel;
