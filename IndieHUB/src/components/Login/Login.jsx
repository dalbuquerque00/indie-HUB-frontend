import React, { useState } from "react";
import "./Login.css";

function validate({ email, password }) {
  const errors = {};
  if (!email) errors.email = "E-mail é obrigatório";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido";
  if (!password) errors.password = "Senha é obrigatória";
  return errors;
}

function Login() {
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
      // Aqui vai a requisição para o backend futuramente
      // Simulação de login
      if (form.email === "teste@email.com" && form.password === "123456") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setForm({ email: "", password: "" });
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
        <a className="login-link" href="/register"> Cadastre-se</a>
      </p>
    </div>
  );
}


export default Login;