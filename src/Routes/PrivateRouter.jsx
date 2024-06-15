import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRouter = ({ children }) => {
    const { user } = useContext(AuthContext);

    const location = useLocation();

    if (user) {
        return children;
    }
    return <Navigate to="/loginSignup" state={{ from: location }} replace></Navigate>
};

export default PrivateRouter;