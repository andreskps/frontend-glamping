
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><h1>Home</h1></div>}/>
        <Route path="/login" element={<LoginPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
