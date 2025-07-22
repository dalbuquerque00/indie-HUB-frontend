// src/pages/Profile.jsx
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import "./Profile.css";
import mockGames from "../data/mockGames";

const GENRES = [
  "Ação", "Puzzle", "Plataforma", "Metroidvania", "Roguelike", "RPG", "Horror", "Simulação", "Aventura"
];

function Profile() {
  const [user, setUser] = useState({
    avatar: "https://i.pravatar.cc/150?img=13",
    name: "Danilo Morais",
    bio: "Amante de jogos indies e desenvolvedor nas horas vagas.",
    joined: "2024-07-01",
    favGenres: ["Puzzle", "Aventura", "Plataforma"],
  });

  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio,
    genres: user.favGenres.join(", "),
  });
  const [preview, setPreview] = useState(null);

  const [favorites, setFavorites] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    setUser({
      ...user,
      name: form.name,
      bio: form.bio,
      favGenres: form.genres.split(",").map(g => g.trim()).filter(Boolean),
    });
    setEditOpen(false);
  }

  // Avatar editing (just a preview here)
  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUser({ ...user, avatar: url });
      setPreview(url);
      // depois conectar com backend pra salvar
    }
  }

  const favoriteGames = mockGames.filter(game => favorites.includes(game.id));

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Avatar editável */}
        <div className="avatar-edit-container">
          <img
            src={preview || user.avatar}
            alt={user.name}
            className="profile-avatar"
          />
          <label className="avatar-edit-btn" title="Editar foto">
            <FiEdit2 />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        {/* Header com nome e botão de edição */}
        <div className="profile-header-row">
          <h2 className="profile-name">{user.name}</h2>
          <FiEdit2 className="edit-icon" onClick={() => setEditOpen(true)} title="Editar perfil" />
        </div>
        <p className="profile-bio">{user.bio}</p>
        <p className="profile-email">{user.email}</p>
        <p className="profile-joined">Membro desde: {user.joined}</p>
        <div className="profile-genres">
          <span>Gêneros favoritos:</span>
          <ul>
            {user.favGenres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal de edição */}
      {editOpen && (
        <div className="profile-modal-backdrop" onClick={() => setEditOpen(false)}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <h3>Editar perfil</h3>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Seu nome"
            />
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Sua bio"
              rows={3}
            />
            <div className="modal-genres">
              <span>Gêneros favoritos:</span>
              <div className="genres-list">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    className={
                      form.genres
                        .split(",")
                        .map(g => g.trim())
                        .includes(genre)
                        ? "genre-selected"
                        : ""
                    }
                    onClick={() => {
                      let list = form.genres
                        .split(",")
                        .map(g => g.trim())
                        .filter(Boolean);
                      if (list.includes(genre)) {
                        list = list.filter((g) => g !== genre);
                      } else {
                        list.push(genre);
                      }
                      setForm({ ...form, genres: list.join(", ") });
                    }}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <button className="profile-save-btn" onClick={handleSave}>Salvar</button>
            <button className="profile-cancel-btn" onClick={() => setEditOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="profile-favorites-section">
        <h3>Favoritos</h3>
        {favoriteGames.length === 0 ? (
          <div className="profile-no-favorites">Você ainda não favoritou nenhum jogo.</div>
        ) : (
          <div className="profile-favorites-list">
            {favoriteGames.map(game => (
              <a key={game.id} href={`/game/${game.id}`} className="profile-favorite-card">
                <img src={game.cover} alt={game.title} className="profile-favorite-img" />
                <div className="profile-favorite-title">{game.title}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;