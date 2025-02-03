import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/reducers/user/userSlice";
import { AppDispatch } from "../../../redux/store";

import { Button } from '../Button/Button';

const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Button
      onClick={handleLogout}
      variant="danger"
      className="w-full"
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
