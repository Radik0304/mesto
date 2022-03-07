class Card{
  constructor(data, cardsTemplate, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardsTemplate = document.querySelector(cardsTemplate);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() { //генерируем разметку
    const cardsTemplate = document.querySelector('.card-template')
    .content
    .querySelector('.elements__card')
    .cloneNode(true)

    return cardsTemplate
  }

  generateCard() {
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
    this._buttonLike.classList.toggle('elements__button-like_type_active')
  }

  _setEventListeners() { //делаем функцию-обработчик
  
    this._buttonLike = this._card.querySelector('.elements__button-like');
    this._buttonDelete = this._card.querySelector('.elements__button-delete');
    
    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard()
    })

    this._buttonLike.addEventListener('click', () => {
      this._likeCard ()
    })

    this._card.querySelector('.elements__photo').addEventListener('click', this._handleCardClick)

  }
}

export default Card;



