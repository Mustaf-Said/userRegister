import UserButton from "../components/UserButton";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  grupp: string;
}

interface MusikProps {
  users: User[];
  onDelete: (id: number) => void;
}

const Musik = ({ users, onDelete }: MusikProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => {
    setVisible(!visible);
  };
  return (
    <div className="UserComponent">
      <UserButton
        handleButton={toggle}
        title={visible ? "Close Grupp" : "Musik Grupp"}
      />
      {visible ? (
        users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="UserStyle">
              <p>Name: {user.name}</p>
              <p>Grupp: {user.grupp}</p>
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

export default Musik;
