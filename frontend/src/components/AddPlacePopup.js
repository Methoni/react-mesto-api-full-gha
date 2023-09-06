import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setLink] = React.useState('');

  React.useEffect(() => {
    setPlaceName('');
    setLink('');
  }, [isOpen]);

  function handlePlaceNameInput(event) {
    setPlaceName(event.target.value);
  }

  function handleLinkInput(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      text="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
    >
      <div className="popup__block">
        <input
          type="text"
          name="name"
          placeholder="Название"
          className="popup__input popup__input_place_name"
          id="place-name-input"
          required
          minLength="2"
          maxLength="30"
          value={placeName}
          onChange={handlePlaceNameInput}
        />
        <span className="popup__input-error place-name-input-error"></span>
      </div>
      <div className="popup__block">
        <input
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_place_link"
          id="link-input"
          required
          value={placeLink}
          onChange={handleLinkInput}
        />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
