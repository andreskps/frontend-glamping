import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

import ProductsPage from "./pages/products/ProductsPage";
import PropertiesPage from "./pages/properties/PropertiesPage";
import PropertiesCreate from "./pages/properties/PropertiesCreate";
import ProtectedRoutes from "./layouts/AdminLayout";
import { Toaster } from "react-hot-toast";
import PropertyEdit from "./pages/properties/PropertyEdit";
import ProductsCreate from "./pages/products/ProductsCreate";
import ProductsEdit from "./pages/products/ProductsEdit";
import ServicesPage from "./pages/services-property/ServicesPage";
import ServicesCreate from "./pages/services-property/ServicesCreate";
import ServiceEdit from "./pages/services-property/ServiceEdit";
import PoliticsPage from "./pages/politics/PoliticsPage";
import PoliticCreate from "./pages/politics/PoliticCreate";
import PoliticEdit from "./pages/politics/PoliticEdit";
import MapView from "./components/map/MapView";
import { useLocationStore } from "./store/locationStore";
import { Preline } from "./Preline";
import { ReservationPage } from "./pages/reservations/ReservationPage";
import { ReservationDetailsPage } from "./pages/reservations/ReservationDetailsPage";





function App() {
  const setLocation = useLocationStore((state) => state.setLocation);
 

  useEffect(() => {
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return (
    <BrowserRouter>
    {/* <Preline/> */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <MapView />
            </div>
          }
        />
        <Route path="login" element={<LoginPage />} />

        <Route
          path="admin"
          element={<ProtectedRoutes requiredRoles={["owner"]} />}
        >
          {/* Rutas propiedades*/}
          <Route index element={<DashboardPage />} />
          <Route path="propiedades" element={<PropertiesPage />} />
          <Route path="propiedades/crear" element={<PropertiesCreate />} />
          <Route path="propiedades/editar/:id" element={<PropertyEdit />} />

          {/*Rutas politicas*/}
          <Route path="politicas" element={<PoliticsPage />} />
          <Route path="politicas/crear" element={<PoliticCreate />} />
          <Route path="politicas/editar/:id" element={<PoliticEdit />} />

          {/* Rutas productos*/}
          <Route path="productos" element={<ProductsPage />} />
          <Route path="productos/crear" element={<ProductsCreate />} />
          <Route path="productos/editar/:id" element={<ProductsEdit />} />

          {/* Rutas servicios*/}
          <Route path="servicios" element={<ServicesPage />} />
          <Route path="servicios/crear" element={<ServicesCreate />} />
          <Route path="servicios/editar/:id" element={<ServiceEdit />} />

          {/*reservations*/}
          <Route path="reservas" element={<ReservationPage/>} />

          <Route path="reserva/detalles/:id" element={<ReservationDetailsPage/>} />



          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
