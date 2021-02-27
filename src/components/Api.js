export default class Api {
  constructor(config) {
    this._url = config.url;
    this._groupId = config.groupId;
    this._headers = config.headers;
    this._body = '';
  }


  /* C A R D S   R E Q U E S T S */

  getCards() {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка на сервере ${res.status}`)
    })
  }

  postCard(data) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.log(this._body);
          return Promise.reject(`Ошибка на сервере ${res.status}`)
        })
  }

  deleteCard(cardId) {
    this._cardId = cardId;
      return fetch(`${this._url}/${this._groupId}/cards/${this._cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка на сервере ${res.status}`)
        })
  }


  /* U S E R   R E Q U E S T S */
  /* Info */
  getUserInfo() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "GET",
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка на сервере ${res.status}`)
    })
  }

  changeUserInfo(data) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(this._body);
        return Promise.reject(`Ошибка на сервере ${res.status}`)
      })
    }

  /* Avatar */
  changeUserImage(data) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.log(this._body);
          return Promise.reject(`Ошибка на сервере ${res.status}`)
        })
  }


  /* L I K E   R E Q U E S T S */

  putLike(data) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${data._id}`, {
      method: "PUT",
      headers: this._headers
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.log(this._body);
          return Promise.reject(`Ошибка на сервере ${res.status}`)
        })
  }

  deleteLike(data) {
    return fetch(`${this._url}/${this._groupId}/cards/likes/${data._id}`, {
      method: "DELETE",
      headers: this._headers
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          console.log(this._body);
          return Promise.reject(`Ошибка на сервере ${res.status}`)
        })
  }
}
