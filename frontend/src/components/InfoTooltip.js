import React from 'react';

function InfoTooltip({ name, isOpen, isSuccessful, onClose }) {
  const classOpen = `${isOpen ? 'popup_opened' : ''}`;
  const classError = `${!isSuccessful ? 'popup__reg-image_error' : ''}`;
  return (
    <div className={`popup popup-${name} ${classOpen}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button
          type="button"
          className="popup__icon"
          onClick={onClose}
        ></button>
        <div className={`popup__reg-image ${classError}`}></div>
        <h2 className={`popup__header popup__header_${name}`}>
          {isSuccessful
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
