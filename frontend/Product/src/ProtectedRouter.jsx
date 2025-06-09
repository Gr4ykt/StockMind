import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./context/authContext";

function ProtectedRouter() {
    const {loading, isAuthenticated} = useAuth();

    if (loading) return(<h1>Loading...</h1>);
    if (!loading && !isAuthenticated) return <Navigate to='/' replace />

    return <Outlet />;
}

export default ProtectedRouter;