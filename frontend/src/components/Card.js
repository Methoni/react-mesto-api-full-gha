import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `place__heart place__like-icon ${
    isLiked && 'place__heart_black'
  }`;

  const handleClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
    // console.log(card.owner);
    // console.log(currentUser._id);
    // console.log(card.likes);
  };

  const handleDeleteClick = () => {
    // onCardDelete(card._id);
    onCardDelete(card);
  };

  return (
    <li className="place place__element">
      <img
        src={card.link}
        alt={card.name}
        className="place__image place__image_card"
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="button"
          className="place__trash place__trash_button"
          onClick={handleDeleteClick}
        />
      )}
      ;
      <div className="place__line">
        <h2 className="place__title place__title_card place__title_card">
          {card.name}
        </h2>
        <div className="place__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
export default Card;
