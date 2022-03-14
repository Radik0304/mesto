class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    getProfile(){ //получение данных профиля
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }
    

    getInitialCards() { //получение карточек
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }

    editProfile(name, about) { //редактирование профиля
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }
  
    addNewCard(name, link) { //добавление новой карточки
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }

    deleteCard(id) { //
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }

    putLike(id) { //
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }

    deleteLike(id) { //
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(res => res.ok ? res.json(): Promise.reject(res.status))
      .catch(console.log)
    }
  
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: 'c976b162-0019-4917-8673-b675c41acfab',
      'Content-Type': 'application/json'
    }
  });