import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "../components/Admin/sidebar/Sidebar";
import Header from "../components/Admin/Header/Header";

// Hook personalizado para la autorización
const useAuthorization = (requiredRoles) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const profile = useAuthStore((state) => state.profile);

  const hasRequiredRole = profile?.roles?.some((role) =>
    requiredRoles.includes(role)
  );

  return { isAuth, hasRequiredRole };
};

const AdminLayout = ({ requiredRoles }) => {
  const { isAuth, hasRequiredRole } = useAuthorization(requiredRoles);

  if (!isAuth || !hasRequiredRole) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
