import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

function AuthRoute({ component: Component }: { component: React.ElementType }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth");
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <Auth />;
    }

    return <Component />;
}

export default AuthRoute;
