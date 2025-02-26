import { MouseEventHandler } from "react";
import "./user.css";

interface ChildComponentProps {
  handleButton: MouseEventHandler<HTMLButtonElement>;
  title: string;
}

const UserButton = ({ handleButton, title }: ChildComponentProps) => {
  return (
    <div>
      <button type="button" onClick={handleButton}>
        {title}
      </button>
    </div>
  );
};

export default UserButton;
