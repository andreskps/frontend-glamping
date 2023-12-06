
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><h1>Home</h1></div>}/>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin" element={<AdminLayout requiredRoles={["owner"]}/>}>
          <Route index element={<DashboardPage/>} />
       </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
