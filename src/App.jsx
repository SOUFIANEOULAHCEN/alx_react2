import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/youtube/Home";
import TemplateYoutube from "./components/youtube/TemplateYoutube";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Correction de l'importation

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/youtube" element={<TemplateYoutube />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/" element={<Home />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;