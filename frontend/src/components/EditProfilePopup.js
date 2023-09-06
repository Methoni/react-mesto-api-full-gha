import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      text="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onUpdateUser={onUpdateUser}
      onSubmit={handleSubmit}
    >
      <div className="popup__block">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__input popup__input_profile_name"
          id="name-input"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__block">
        <input
          type="text"
          name="about"
          placeholder="О себе"
          className="popup__input popup__input_profile_job"
          id="about-input"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error about-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
