export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  //открытие попа
  open(){
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._closePopupByClickOverlay);
  }

  //закрытие попа
  close(){
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._closePopupByClickOverlay);
  }

  //закрытие попапа по эскейпу}
  _handleEscClose = (evt) => {
    if(evt.key === 'Escape'){
      this.close()
    }
  }

  //закрытие попапа по оверлею
_closePopupByClickOverlay = (e) => {
  if(e.target.classList.contains('popup')){
    this.close()
  }
}

  //слушатели попапа
  setEventListeners(){
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {this.close()})
  }
}