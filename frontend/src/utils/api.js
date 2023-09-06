class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  // проверка ответа сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // получение карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // добавление карточки на сервер
  addNewCard(cardData, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
        owner: cardData.owner,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // удаление карточки с сервера
  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => this._getResponseData(res));
  }

  // добавление лайка
  addLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // удаление лайка
  deleteLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this.deleteLike(cardId, token);
    } else {
      return this.addLike(cardId, token);
    }
  }

  // получение своих данных пользователя с сервера
  getMyUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // внесение изменений в свои данные пользователя на сервере
  editUserInfo(profileData, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // изменение своего аватара на сервере
  editAvatar(profileData, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: profileData.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // возвращает массив промисов, которые нужно исполнить
  getAllNeededData(token) {
    return Promise.all([
      this.getInitialCards(token),
      this.getMyUserInfo(token),
    ]);
  }
}

// создание экземпляра класса Api
export const api = new Api({
  baseUrl: 'https://api.methoni.nomoredomainsicu.ru',
});
