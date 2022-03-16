import {renderLoading} from '../pages/index.js'

class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }

    _checkResponse(res){ //проверка ответа от сервера
      if(res.ok){
        return res.json();
      }
      return Promise.reject(res.status)
    }

    getProfile(){ //получение данных профиля
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse)
    }
    
    getInitialCards() { //получение карточек
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(this._checkResponse)
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
      .then(this._checkResponse)
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
      .then(this._checkResponse)
    }

    deleteCard(id) { //удаление карточки
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    putLike(id) { //постановка лайка
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    deleteLike(id) { //удаление лайка
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      })
      .then(this._checkResponse)
    }

    changeAvatar(avatar) { //редактирование аватара
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(avatar)
      })
      .then(this._checkResponse)
    }
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
      authorization: 'c976b162-0019-4917-8673-b675c41acfab',
      'Content-Type': 'application/json'
    }
  });