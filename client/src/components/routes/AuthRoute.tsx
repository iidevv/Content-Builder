import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { Auth } from "../Auth/Auth";

function AuthRoute({ component: Component }: { component: React.ElementType }) {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();

    useEffect(() => {
        if (!authenticated) {
            navigate("/auth");
        }
    }, [authenticated, navigate]);

    if (!authenticated) {
        return <Auth />;
    }

    return <Component />;
}

export default AuthRoute;
