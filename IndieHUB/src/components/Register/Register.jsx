import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function validate({ name, email, password }) {
  const errors = {};
  if (!name || name.length < 2) errors.name = "Nome deve ter pelo menos 2 caracteres";
  if (!email) errors.email = "E-mail é obrigatório";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "E-mail inválido";
  if (!password || password.length < 6) errors.password = "Senha deve ter pelo menos 6 caracteres";
  return errors;
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
      // Aqui você pode fazer a requisição para backend de cadastro
      // Simulação de cadastro:
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      setForm({ name: "", email: "", password: "" });
    }
  }

  return (
    <div className="register-container">
      <h2 className="register-title">Criar nova conta</h2>
      {success && <div className="register-success">✅ Cadastro realizado com sucesso!</div>}
      {apiError && <div className="register-error">{apiError}</div>}

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <label>
          <span role="img" aria-label="Pessoa"></span> Nome
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <div className="register-error">{errors.name}</div>}

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
        {errors.email && <div className="register-error">{errors.email}</div>}

        <label>
          <span role="img" aria-label="Senha"></span> Senha
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errors.password && <div className="register-error">{errors.password}</div>}

        <button className="register-btn" type="submit">
          <span role="img" aria-label="Registrar"></span> Cadastrar
        </button>
      </form>

      <p className="register-link-msg">
        Já possui conta?
        <Link className="register-link" to="/login"> Entrar</Link>
      </p>
    </div>
  );
}

export default Register;