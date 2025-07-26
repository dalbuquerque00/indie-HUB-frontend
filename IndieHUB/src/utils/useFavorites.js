import { useState, useEffect } from "react";

export function useFavorites() {
  // Recupera o usuário logado (tem q estar no localStorage)
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = user ? `indiehub_favorites_${user.email}` : null;

  const [favorites, setFavorites] = useState(() => {
    if (!userKey) return [];
    const saved = localStorage.getItem(userKey);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(favorites));
    }
  }, [favorites, userKey]);

  // Aqui serve para salvar o objeto do jogo inteiro nos favoritos
  function addFavorite(game) {
    setFavorites(favs =>
      favs.some(fav => fav.id === game.id) ? favs : [...favs, game]
    );
  }

  function removeFavorite(id) {
    setFavorites(favs => favs.filter(fav => fav.id !== id));
  }

  function isFavorite(id) {
    return favorites.some(fav => fav.id === id);
  }

  return { favorites, addFavorite, removeFavorite, isFavorite };
}