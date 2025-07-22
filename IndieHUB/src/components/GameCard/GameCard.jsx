
import './GameCard.css';

function GameCard({ game }) {
  return (
    <div className="game-card">
      <div className="game-card__header">
        <img
          src={game.cover}
          alt={`Capa do jogo ${game.title}`}
          className="game-card__cover"
          onError={e => { e.target.src = '/default-cover.png'; }}
        />
        <div className="game-card__info">
          <h3 className="game-card__title">{game.title}</h3>
          <div className="game-card__meta">
            <span className="game-card__year">{game.year}</span>
            <span className="game-card__rating" title="Nota do jogo">⭐ {game.rating}</span>
          </div>
          <p className="game-card__genre">{game.genre}</p>
        </div>
      </div>
      <p className="game-card__description">{game.description}</p>
      <p className="game-card__author">
        <strong>Desenvolvedor:</strong> {game.author}
      </p>
      {game.link && (
        <a
          href={game.link}
          target="_blank"
          rel="noopener noreferrer"
          className="game-card__play-btn"
        >
          Jogar / Ver mais
        </a>
      )}
    </div>
  );
}

export default GameCard;