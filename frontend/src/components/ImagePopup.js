import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    card && (
      <div
        className={`popup popup-image popup_darker ${
          card._id ? 'popup_opened' : ''
        }`}
      >
        <div className="popup__card">
          <button
            type="button"
            className="popup__icon"
            onClick={onClose}
          ></button>
          <img
            src={card.link}
            alt={card.link}
            className="popup__pic popup-image__pic"
          />
          <h2 className="popup__caption popup-image__caption">{card.name}</h2>
        </div>
      </div>
    )
  );
}
export default ImagePopup;
