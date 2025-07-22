import { useState } from "react";
import { useParams } from "react-router-dom";
import mockGames from "../data/mockGames";
import "./GameDetails.css";

// Ícones SVG externos temporarios
const iconLinks = {
  steam: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/steam.svg",
  itch: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/itchdotio.svg",
  website: "https://cdn-icons-png.flaticon.com/512/159/159604.png"
};

function GameDetails() {
  const { id } = useParams();
  const game = mockGames.find(g => String(g.id) === id);

  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!game) return <div>Jogo não encontrado.</div>;

  const isFavorite = favorites.includes(game.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(favId => favId !== game.id));
    } else {
      setFavorites([...favorites, game.id]);
    }
  };

  const handleStarClick = (num) => {
    if (!submitted) {
      setRating(num);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== "") {
      setSubmitted(true);
    }
  };

  return (
    <div className="game-details-main">
      <div className="game-details-header">
        <img src={game.cover} alt={game.title} className="game-details-img" />
        <div className="game-details-info">
          <h2>{game.title}</h2>
          <div className="game-details-meta">
            <span className="game-details-year">{game.year}</span>
            <span className="game-details-rating">⭐ {game.rating}</span>
          </div>
          <div className="game-details-genres">
            {game.genres?.map((genre, idx) => (
              <span key={idx} className="genre-tag">{genre}</span>
            ))}
          </div>
          <div className="game-details-links">
            {game.steam && (
              <a href={game.steam} target="_blank" rel="noopener noreferrer" title="Steam">
                <img src={iconLinks.steam} alt="Steam" className="details-icon" />
              </a>
            )}
            {game.itch && (
              <a href={game.itch} target="_blank" rel="noopener noreferrer" title="Itch.io">
                <img src={iconLinks.itch} alt="Itch.io" className="details-icon" />
              </a>
            )}
            {game.website && (
              <a href={game.website} target="_blank" rel="noopener noreferrer" title="Site oficial">
                <img src={iconLinks.website} alt="Site" className="details-icon" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="game-details-description">
        <h3>Descrição</h3>
        <p>{game.description}</p>
      </div>
      <div className="game-details-actions">
        <button className={`favorite-btn${isFavorite ? " active" : ""}`} onClick={toggleFavorite}>
          {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </button>
        <div className="rating-section">
          <label className="rating-label">Avalie este jogo:</label>
          <div className="star-rating">
            {[1,2,3,4,5].map(num => (
              <button
                key={num}
                className={`star-btn${num <= rating ? " active" : ""}`}
                onClick={() => handleStarClick(num)}
                disabled={submitted}
                type="button"
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="rating-comment"
            placeholder="Deixe seu comentário"
            value={comment}
            onChange={handleCommentChange}
            disabled={submitted}
          />
          <button
            className="rating-submit"
            onClick={handleSubmit}
            disabled={submitted || rating === 0 || comment.trim() === ""}
            type="button"
          >
            Enviar Avaliação
          </button>
          {submitted && <div className="hint-login">Obrigado pela sua avaliação!</div>}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;