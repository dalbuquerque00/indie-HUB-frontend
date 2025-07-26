import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from '../Navigation/Navbar';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Home from '../Home/Home';
import About from '../About/About';
import Profile from '../Profile/Profile';
import Catalog from '../Catalog/Catalog';
import GameDetails from '../GameDetails/GameDetails';

function App() {
  const [modalOpen, setModalOpen] = useState(null);

  useEffect(() => {
    function handleOpenLogin() {
      setModalOpen("login");
    }
    window.addEventListener("openLoginModal", handleOpenLogin);
    return () => window.removeEventListener("openLoginModal", handleOpenLogin);
  }, []);

  useEffect(() => {
    function handleLoginSuccess() {
      setModalOpen(null);
    }
    window.addEventListener("loginSuccess", handleLoginSuccess);
    return () => window.removeEventListener("loginSuccess", handleLoginSuccess);
  }, []);

  return (
    <Router>
      <Navbar
        onLoginClick={() => setModalOpen("login")}
        onRegisterClick={() => setModalOpen("register")}
      />
      <ModalWithForm isOpen={modalOpen === "login"} onClose={() => setModalOpen(null)}>
        <Login 
          onLoginSuccess={() => setModalOpen(null)}
          onSwitchToRegister={() => setModalOpen("register")}
        />
      </ModalWithForm>
      <ModalWithForm isOpen={modalOpen === "register"} onClose={() => setModalOpen(null)}>
        <Register 
          onSwitchToLogin={() => setModalOpen("login")}
        />
      </ModalWithForm>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </Main>
      <Footer />
    </Router>
  );
}

export default App;