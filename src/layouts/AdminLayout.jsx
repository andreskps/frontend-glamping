import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Hook personalizado para la autorización
const useAuthorization = (requiredRoles) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const profile = useAuthStore((state) => state.profile);

  const hasRequiredRole = profile?.roles?.some((role) => requiredRoles.includes(role));

  return { isAuth, hasRequiredRole };
};

const AdminLayout = ({ requiredRoles }) => {
  const { isAuth, hasRequiredRole } = useAuthorization(requiredRoles);

  if (!isAuth || !hasRequiredRole) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex">
        <div className="w-1/5 h-screen bg-gray-800">
          <h1 className="text-white text-2xl font-bold p-4">Admin</h1>
        </div>
        <div className="w-4/5 h-screen bg-gray-100">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;