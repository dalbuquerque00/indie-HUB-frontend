import React, { useState } from 'react';
import './GameCard.css';

function GameCard({ game }) {
  const [hovered, setHovered] = useState(false);

  // Map plataformas
  const platformIcons = {
    pc: '🖥️',
    playstation: '🎮',
    xbox: '🟩',
    nintendo: '🎲',
    mac: '🍏',
    linux: '🐧',
    ios: '📱',
    android: '🤖',
    web: '🌐'
  };
  const platforms = game.platforms
    ? [...new Set(game.platforms.map(p => p.platform.slug))]
    : [];

  const genres = game.genres?.map(g => g.name).join(', ') || '--';
  const rating = game.rating?.toFixed(2) || '--';

  return (
    <div
      className={`game-card${hovered ? ' hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={game.background_image || '/assets/images/indie-bg-home.jpg'}
        alt={game.name}
        className="game-card__cover"
      />
      <div className="game-card__info">
        <div className="game-card__platforms">
          {platforms.map((plat, idx) => (
            <span key={plat + idx}>{platformIcons[plat] || '🎮'}</span>
          ))}
        </div>
        <h3 className="game-card__title">{game.name}</h3>
        <div className="game-card__rating">⭐ {rating}</div>
      </div>

      {/* Overlay/hover */}
      <div className="game-card__overlay">
        <div className="game-card__overlay-content">
          <div className="game-card__platforms">
            {platforms.map((plat, idx) => (
              <span key={plat + idx}>{platformIcons[plat] || '🎮'}</span>
            ))}
          </div>
          <h3 className="game-card__title">{game.name}</h3>
          <div className="game-card__meta-row">
            <span className="game-card__label">Release date:</span>
            <span className="game-card__value">{game.released || '--'}</span>
          </div>
          <div className="game-card__meta-row">
            <span className="game-card__label">Genres:</span>
            <span className="game-card__value">{genres}</span>
          </div>
          <div className="game-card__meta-row">
            <span className="game-card__label">Chart:</span>
            <span className="game-card__value">#3 Top 2025</span>
          </div>
          <button className="game-card__wishlist-btn">+ {game.added || 391} 🎯</button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;