import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink className="navbar-logo" to="/">indieHub</NavLink>
        <NavLink className="navbar-link" to="/catalog">Catálogo</NavLink>
        <NavLink className="navbar-link" to="/About">Sobre</NavLink>
        <NavLink className="navbar-link" to="/profile">Perfil</NavLink>
      </div>
      <div className="navbar-right">
        <button className="navbar-btn" onClick={onLoginClick}>Entrar</button>
        <button className="navbar-btn navbar-btn-register" onClick={onRegisterClick}>Cadastrar</button>
      </div>
    </nav>
  );
}

export default Navbar;