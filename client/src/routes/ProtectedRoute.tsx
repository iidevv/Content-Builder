import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Login from "../components/Auth/Login";

function ProtectedRoute({ component: Component }: { component: React.ElementType }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <Login />;
    }

    return <Component />;
}

export default ProtectedRoute;
