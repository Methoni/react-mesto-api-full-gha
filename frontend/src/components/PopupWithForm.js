import React from 'react';

function PopupWithForm({
  name,
  title,
  text,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  const classOpen = `${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={`popup popup-${name} ${classOpen}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button
          type="button"
          className="popup__icon"
          onClick={onClose}
        ></button>
        <h2 className="popup__header">{title}</h2>
        <form
          name={`${name}-form`}
          className={`popup__form popup__form_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type="submit"
            className={`popup__button popup__button_${name}`}
          >
            {text}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
