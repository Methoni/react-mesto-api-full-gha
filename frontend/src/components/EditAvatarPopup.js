import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef({});

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      text="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateAvatar={onUpdateAvatar}
      onSubmit={handleSubmit}
    >
      <div className="popup__block">
        <input
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          className="popup__input"
          id="avatar-input"
          required
          ref={avatarRef}
        />
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
