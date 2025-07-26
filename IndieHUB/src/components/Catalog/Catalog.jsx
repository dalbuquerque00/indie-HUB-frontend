import React, { useState, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import "./Catalog.css";
import { Link } from "react-router-dom";
import { fetchManyIndieGames } from "../../utils/rawgApi";

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(9);

  // Teste frontend: buscar 120 jogos indies pelo menos
  useEffect(() => {
    setLoading(true);
    fetchManyIndieGames(120)
      .then(gamesArr => setGames(gamesArr))
      .catch(() => setError("Erro ao carregar jogos"))
      .finally(() => setLoading(false));
  }, []);

  const filteredGames = games.filter(game => {
    const lower = search.toLowerCase();
    return (
      game.name.toLowerCase().includes(lower) ||
      (game.genres && game.genres.some(g => g.name.toLowerCase().includes(lower)))
    );
  });

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo de Jogos Indies</h1>
      <p className="catalog-subtitle">
        Descubra, avalie os melhores jogos indies!
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
      </div>

      <div className="catalog-grid">
        {loading ? (
          <div className="catalog-empty">Carregando jogos...</div>
        ) : error ? (
          <div className="catalog-empty">{error}</div>
        ) : filteredGames.length === 0 ? (
          <div className="catalog-empty">Nenhum jogo encontrado.</div>
        ) : (
          filteredGames.slice(0, visible).map((game) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <GameCard game={game} />
            </Link>
          ))
        )}
      </div>
      {!loading && !error && filteredGames.length > visible && (
        <div className="catalog-show-more-row">
          <button className="catalog-show-more-btn" onClick={() => setVisible(visible + 9)}>
            Mostrar mais
          </button>
        </div>
      )}
    </div>
  );
}

export default Catalog;