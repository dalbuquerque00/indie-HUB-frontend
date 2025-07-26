import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import androidIcon from '../../assets/icons/android-icon.svg';
import appleIcon from '../../assets/icons/apple-icon.svg';
import iosIcon from '../../assets/icons/ios-icon.svg';
import linuxIcon from '../../assets/icons/linux-icon.svg';
import playstationIcon from '../../assets/icons/playstation-icon.svg';
import steamIcon from '../../assets/icons/steam-icon.svg';
import xboxIcon from '../../assets/icons/xbox-icon.svg';
import nintendoIcon from '../../assets/icons/nintendo-logo.svg';
import xboxSeriesxIcon from '../../assets/icons/xbox-x-icon.svg';
import xbox1Icon from '../../assets/icons/xbox-1-icon.svg';
import xboxOneIcon from '../../assets/icons/xbox-one-icon.svg';
import ps3Icon from '../../assets/icons/playstation3-icon.svg';
import ps4Icon from '../../assets/icons/ps4-icon.svg';
import ps5Icon from '../../assets/icons/ps5-icon.svg';
import switchIcon from '../../assets/icons/nintendo-switch-icons.svg';
import './GameCard.css';

function GameCard({ game }) {
  const [hovered, setHovered] = useState(false);

  const platformIcons = {
    pc: steamIcon,
    mac: appleIcon,
    linux: linuxIcon,
    ios: iosIcon,
    android: androidIcon,
    playstation: playstationIcon,
    playstation4: ps4Icon,
    playstation5: ps5Icon,
    playstation3: ps3Icon,
    xbox: xbox1Icon,
    xbox360: xboxIcon,
    'xbox-one': xboxOneIcon,
    'xbox-series-x': xboxSeriesxIcon,
    nintendo: nintendoIcon,
    'nintendo-switch': switchIcon,
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
          {platforms.map((plat, idx) => {
            const iconSrc =
              platformIcons[plat] ||
              (plat.startsWith("playstation") ? playstationIcon :
               plat.startsWith("xbox") ? xboxIcon :
               plat.startsWith("nintendo") ? nintendoIcon :
               null);
            return iconSrc ? (
              <img
                key={plat + idx}
                src={iconSrc}
                alt={plat}
                title={plat}
                className="platform-icon"
              />
            ) : null;
          })}
        </div>
        <h3 className="game-card__title">{game.name}</h3>
        <div className="game-card__rating">⭐ {rating}</div>
      </div>

      {hovered && (
        <div className="game-card__extra">
          <div className="game-card__meta-row">
            <span className="game-card__label">Release date:</span>
            <span className="game-card__value">{game.released || '--'}</span>
          </div>
          <div className="game-card__meta-row">
            <span className="game-card__label">Genres:</span>
            <span className="game-card__value">{genres}</span>
          </div>
          <Link to={`/games/${game.id}`} className="game-card__wishlist-btn">
            Saiba mais
          </Link>
        </div>
      )}
    </div>
  );
}

export default GameCard;