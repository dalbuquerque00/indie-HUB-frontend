const apiKey = import.meta.env.VITE_RAWG_API_KEY;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GameDetails.css";

import androidIcon from '../../assets/icons/android-icon.svg';
import appleIcon from '../../assets/icons/apple-icon.svg';
import iosIcon from '../../assets/icons/ios-icon.svg';
import linuxIcon from '../../assets/icons/linux-icon.svg';
import playstationIcon from '../../assets/icons/playstation-icon.svg';
import steamIcon from '../../assets/icons/steam-icon.svg';
import xboxIcon from '../../assets/icons/xbox-icon.svg';
import nintendoIcon from '../../assets/icons/nintendo-logo.svg';

import { useFavorites } from "../../utils/useFavorites";


const platformIcons = {
  pc: steamIcon,
  mac: appleIcon,
  linux: linuxIcon,
  ios: iosIcon,
  android: androidIcon,
  playstation: playstationIcon,
  playstation4: playstationIcon,
  playstation5: playstationIcon,
  xbox: xboxIcon,
  xbox360: xboxIcon,
  xbox_one: xboxIcon,
  xbox_series_x: xboxIcon,
  nintendo: nintendoIcon,
  nintendo_switch: nintendoIcon
};

function GameDetails() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [game, setGame] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Não foi possível carregar o jogo.");
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error || !game || game.detail === "Not found.") return <div>Jogo não encontrado.</div>;


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
        <img src={game.background_image} alt={game.name} className="game-details-img" />
        <div className="game-details-info">
          <h2>{game.name}</h2>
          <div className="game-details-meta">
            <span className="game-details-year">{game.released?.split("-")[0]}</span>
            <span className="game-details-rating">⭐ {game.rating}</span>
          </div>
          <div className="game-details-genres">
            {game.genres?.map((genre, idx) => (
              <span key={idx} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          <div className="game-details-platforms">
            {game.platforms?.map((p, idx) => {
              const slug = p.platform.slug;
              const iconSrc =
                platformIcons[slug] ||
                (slug.startsWith("playstation") ? playstationIcon :
                 slug.startsWith("xbox") ? xboxIcon :
                 slug.startsWith("nintendo") ? nintendoIcon :
                 null);
              return iconSrc ? (
                <img
                  key={slug + idx}
                  src={iconSrc}
                  alt={p.platform.name}
                  title={p.platform.name}
                  className="platform-icon"
                />
              ) : null;
            })}
          </div>
          
        </div>
      </div>
      <div className="game-details-description">
        <h3>Descrição</h3>
        <p>{game.description_raw || "Sem descrição."}</p>
      </div>
      <div className="game-details-actions">
        <button
          className={`favorite-btn${isFavorite(game.id) ? " active" : ""}`}
          onClick={() => {
            if (!currentUser) {
              alert("Você precisa estar logado para adicionar aos favoritos!");
              
              return;
            }
            if (isFavorite(game.id)) {
              removeFavorite(game.id);
            } else {
              addFavorite({
                id: game.id,
                name: game.name,
                background_image: game.background_image
              });
            }
          }}
          title={isFavorite(game.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-label={isFavorite(game.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          type="button"
        >
          {isFavorite(game.id) ? "★ Remover dos Favoritos" : "☆ Adicionar aos Favoritos"}
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