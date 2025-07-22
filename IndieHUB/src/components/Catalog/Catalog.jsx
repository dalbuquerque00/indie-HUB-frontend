import React, { useState, useMemo } from "react";
import GameCard from "../GameCard/GameCard";
import mockGames from "../data/mockGames";
import "./Catalog.css";
import { Link } from "react-router-dom";

function Catalog() {
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("Todos");

  const genres = useMemo(() => [
    "Todos",
    ...Array.from(new Set(mockGames.map((game) => game.genre)))
  ], []);

  const filteredGames = mockGames.filter((game) => {
    const lower = search.toLowerCase();
    const matchesSearch =
      game.title.toLowerCase().includes(lower) ||
      (game.genre && game.genre.toLowerCase().includes(lower)) ||
      (game.author && game.author.toLowerCase().includes(lower));
    const matchesGenre = genreFilter === "Todos" || game.genre === genreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de Jogos Indies</h1>
      <p className="catalog-subtitle">
        Descubra, avalie e compartilhe os melhores jogos indies!
      </p>

      <div className="catalog-filter-row">
        <div className="catalog-search-wrapper">
          <span className="catalog-search-icon">
            <svg width="19" height="19" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" stroke="#b7b9d5" strokeWidth="2"/>
              <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#b7b9d5" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <input
            className="catalog-search"
            type="text"
            placeholder="Buscar por título"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="catalog-genre-filter"
          value={genreFilter}
          onChange={e => setGenreFilter(e.target.value)}
        >
          {genres.map(genre => (
            <option value={genre} key={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="catalog-grid">
        {filteredGames.length === 0 ? (
          <div className="catalog-empty">Nenhum jogo encontrado.</div>
        ) : (
          filteredGames.map((game) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
            >
              <GameCard game={game} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Catalog;