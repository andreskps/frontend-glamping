import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";
import PropertiesList from "./components/properties/PropertiesList";
import ProductsPage from "./pages/products/ProductsPage";
import PropertiesPage from "./pages/properties/PropertiesPage";
import PropertiesCreate from "./pages/properties/PropertiesCreate";
import ProtectedRoutes from "./layouts/AdminLayout";
import {Toaster} from "react-hot-toast";
import PropertyEdit from "./pages/properties/PropertyEdit";
import ProductsCreate from "./pages/products/ProductsCreate";
import ProductsEdit from "./pages/products/ProductsEdit";
import ServicesPage from "./pages/services-property/ServicesPage";
import ServicesCreate from "./pages/services-property/ServicesCreate";
import ServiceEdit from "./pages/services-property/ServiceEdit";

function App() {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }


  return (
    


    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Home</h1>
            </div>
          }
        />
        <Route path="login" element={<LoginPage />} />

        <Route path="admin" element={<ProtectedRoutes requiredRoles={["owner"]} />}>
       
          <Route index element={<DashboardPage />} />
          <Route path="propiedades" element={<PropertiesPage />} />
          <Route path="propiedades/crear" element={<PropertiesCreate />} />
          <Route path="propiedades/editar/:id" element={<PropertyEdit/>} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="productos/crear" element={<ProductsCreate />} />
          <Route path="productos/editar/:id" element={<ProductsEdit />} />
          <Route path="servicios" element={<ServicesPage/>} />
          <Route path="servicios/crear" element={<ServicesCreate/>} />
          <Route path="servicios/editar/:id" element={<ServiceEdit/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
