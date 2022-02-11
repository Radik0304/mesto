import {popupImage, openPopup} from './index.js'

class Card{
  constructor(name, link, cardsTemplate) {
    this._name = name;
    this._link = link;
    this._cardsTemplate = cardsTemplate;
  }

  _getTemplate() { //генерируем разметку
    const cardsTemplate = document.querySelector('.card-template')
    .content
    .querySelector('.elements__card')
    .cloneNode(true)

    return cardsTemplate
  }

  _generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.elements__name').textContent = this._name;
    this._card.querySelector('.elements__photo').src= this._link;
    this._card.querySelector('.elements__photo').alt = this._name;
    
    return this._card;
  }

  _deleteCard() { //удаление карточки
    this._card.remove();
  }

  _likeCard() { //лайк карточки
    this._card.querySelector('.elements__button-like').classList.toggle('elements__button-like_type_active')
  }

  _openPopupPhoto() { //открытие фотопопапа
    openPopup(popupImage);
    popupImage.querySelector('.popup__image-photo').src = this._link;
    popupImage.querySelector('.popup__image-photo').alt = this._name;
    popupImage.querySelector('.popup__image-text').textContent = this._name;
  }
  _setEventListeners() { //делаем функцию-обработчик
  
    this._card.querySelector('.elements__button-delete').addEventListener('click', () => {
      this._deleteCard()
    })

    this._card.querySelector('.elements__button-like').addEventListener('click', () => {
      this._likeCard ()
    })

    this._card.querySelector('.elements__photo').addEventListener('click', () => {
      this._openPopupPhoto()
    })
  }
}

export default Card;