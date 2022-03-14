class Card{
  constructor(data, cardsTemplate, {handleCardClick}, handleDeleteClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardsTemplate = document.querySelector(cardsTemplate);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() { //генерируем разметку
    const cardsTemplate = document.querySelector('.card-template')
    .content
    .querySelector('.elements__card')
    .cloneNode(true)

    return cardsTemplate
  }

  _setLikes() {
    const likeNumber = this._card.querySelector('.elements__like-number');
    likeNumber.textContent = this._likes.length;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector('.elements__name').textContent = this._name;
    this._card.querySelector('.elements__photo').src= this._link;
    this._card.querySelector('.elements__photo').alt = this._name;
    
    this._setLikes();

    if(this._ownerId !== this._userId){
      console.log('display none')
      this._card.querySelector('.elements__button-delete').style.display = 'none'
    }

    return this._card;
  }

  deleteCard() { //удаление карточки
    this._card.remove();
  }

  // _likeCard() { //лайк карточки
  //   this._buttonLike.classList.toggle('elements__button-like_type_active')
  // }

  _setEventListeners() { //делаем функцию-обработчик
  
    this._buttonLike = this._card.querySelector('.elements__button-like');
    this._buttonDelete = this._card.querySelector('.elements__button-delete');
    
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._id)
    })

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._id)
    })

    this._card.querySelector('.elements__photo').addEventListener('click', this._handleCardClick)

  }
}

export default Card;



