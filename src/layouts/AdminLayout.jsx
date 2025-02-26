import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "../components/Admin/sidebar/Sidebar";
import Header from "../components/Admin/Header/Header";
import Theme from "../components/Theme";

// Hook personalizado para la autorización
const useAuthorization = (requiredRoles) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const profile = useAuthStore((state) => state.profile);

  const hasRequiredRole = profile?.roles?.some((role) =>
    requiredRoles.includes(role)
  );

  return { isAuth, hasRequiredRole };
};

const ProtectedRoutes = ({ requiredRoles }) => {
  const { isAuth, hasRequiredRole } = useAuthorization(requiredRoles);

  if (!isAuth || !hasRequiredRole) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
      {/* <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto"> */}
      
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoutes;
