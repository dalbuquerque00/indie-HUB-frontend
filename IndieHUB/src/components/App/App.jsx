import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";        
import GameDetails from "./pages/GameDetails";
import SubmitGame from "./pages/SubmitGame";  
import Profile from "./pages/Profile";       
import Login from "./pages/Login";             
import Register from "./pages/Register";       
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/submit" element={<SubmitGame />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
