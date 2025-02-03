import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Login from "./Login";

const Auth = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return <Login />;
};

export default Auth;