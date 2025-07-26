import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import "./Profile.css";

const GENRES = [
  "Ação", "Puzzle", "Plataforma", "Metroidvania", "Roguelike", "RPG", "Horror", "Simulação", "Aventura"
];

function Profile() {
  const [user, setUser] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({ name: "", bio: "", genres: "", avatar: "" });
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (!userData) {
      window.dispatchEvent(new CustomEvent("openLoginModal"));
      navigate("/");
      return;
    }
    const parsed = JSON.parse(userData);
    setUser(parsed);
    setForm({
      name: parsed.name || "",
      bio: parsed.bio || "",
      genres: (parsed.favGenres || []).join(", "),
      avatar: parsed.avatar || ""
    });
    let storedFavorites = [];
    if (parsed && parsed.email) {
      const favKey = `indiehub_favorites_${parsed.email}`;
      const favs = localStorage.getItem(favKey);
      storedFavorites = favs ? JSON.parse(favs) : [];
    }
    setFavorites(storedFavorites);
  }, [navigate]);

  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        const parsed = JSON.parse(userData);
        if (parsed && parsed.email) {
          const favKey = `indiehub_favorites_${parsed.email}`;
          const favs = localStorage.getItem(favKey);
          setFavorites(favs ? JSON.parse(favs) : []);
        }
      }
    };
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    return () => window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
  }, []);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(f => ({ ...f, avatar: reader.result }));
    reader.readAsDataURL(file);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSave() {
    const updatedUser = {
      ...user,
      name: form.name,
      bio: form.bio,
      avatar: form.avatar,
      favGenres: form.genres.split(",").map(g => g.trim()).filter(Boolean)
    };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setEditOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="avatar-edit-container">
          <img
            src={form.avatar || "https://i.pravatar.cc/150?img=13"}
            alt={user.name || user.email}
            className="profile-avatar"
          />
          <label className="avatar-edit-btn" title="Editar foto">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <FiEdit2 className="avatar-edit-icon" />
          </label>
        </div>
        <div className="profile-header-row">
          <h2 className="profile-name">{user.name || user.email}</h2>
          <FiEdit2 className="edit-icon" onClick={() => setEditOpen(true)} title="Editar perfil" />
        </div>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
        {user.email && <p className="profile-email">{user.email}</p>}
        {user.favGenres && user.favGenres.length > 0 && (
          <div className="profile-genres">
            <span>Gêneros favoritos:</span>
            <ul>
              {user.favGenres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
        )}
        <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
      </div>

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
        {favorites.length === 0 ? (
          <div className="profile-no-favorites">Você ainda não favoritou nenhum jogo.</div>
        ) : (
          <div className="profile-favorites-list">
            {favorites.map(game => (
              <div key={game.id} className="profile-favorite-card">
                <img src={game.background_image} alt={game.name} className="profile-favorite-img" />
                <div className="profile-favorite-title">{game.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;