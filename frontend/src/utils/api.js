class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
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
        // authorization: this._authorization,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // добавление карточки на сервер
  addNewCard(cardData, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      // headers: this._headers,
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
      // headers: this._headers,
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
        // authorization: this._authorization,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // удаление лайка
  deleteLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        // authorization: this._authorization,
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
        // authorization: this._authorization,
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponseData(res));
  }

  // внесение изменений в свои данные пользователя на сервере
  editUserInfo(profileData, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      // headers: this._headers,
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
      // headers: this._headers,
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
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  // baseUrl: 'http://localhost:3000',
  // baseUrl: 'https://api.methoni.nomoredomainsicu.ru',
  baseUrl: 'http://api.methoni.nomoredomainsicu.ru',
  // headers: {
  //   authorization: 'b76f62bc-fc94-47a0-8fcd-24ebc70a3fc1',
  //   'Content-Type': 'application/json',
  // },
});
