import React, { useState } from "react";
import "./Login.css";

function validate({ email, password }) {
  const errors = {};
  if (!email) errors.email = "E-mail é obrigatório";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido";
  if (!password) errors.password = "Senha é obrigatória";
  return errors;
}

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setApiError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length === 0) {
      // Teste com login simulado usando localStorage.
      // Busca os usuários cadastrados no localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {
        setSuccess(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));
        setTimeout(() => {
          setSuccess(false);
          setForm({ email: "", password: "" });
          if (onLoginSuccess) onLoginSuccess();
          window.dispatchEvent(new CustomEvent("loginSuccess"));
        }, 1000);
      } else {
        setApiError("E-mail ou senha incorretos");
      }
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">Entrar na Plataforma</h2>
      {success && <div className="login-success">✅ Login efetuado com sucesso!</div>}
      {apiError && <div className="login-error">{apiError}</div>}

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span role="img" aria-label="E-mail"></span> E-mail
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        {errors.email && <div className="login-error">{errors.email}</div>}

        <label>
          <span role="img" aria-label="Senha"></span> Senha
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        {errors.password && <div className="login-error">{errors.password}</div>}

        <button className="login-btn" type="submit">
          <span role="img" aria-label="Entrar"></span> Entrar
        </button>
      </form>
      <p className="login-link-msg">
        Não tem uma conta?
        <span className="login-link" onClick={onSwitchToRegister}> Cadastre-se</span>
      </p>
    </div>
  );
}


export default Login;