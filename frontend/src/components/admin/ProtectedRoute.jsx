import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../../services/api";

const ProtectedRoute = () => {
const token = getAuthToken();

if (!token) {
return <Navigate to="/admin/login" replace />;
}

return <Outlet />;
};

export default ProtectedRoute;
