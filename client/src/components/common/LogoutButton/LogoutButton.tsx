import Cookies from "js-cookie";
import { Button } from '../Button/Button';

const LogoutButton = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload();
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
