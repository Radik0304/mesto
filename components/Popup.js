export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
  }

  //открытие попа
  open(){
    this._popupSelector.classList.add('popup_opened');
  }

  //закрытие попа
  close(){
    this._popupSelector.classList.remove('popup_opened');
    
  }

  //закрытие попапа по эскейпу
  // _handleEscClose(evt){
  //   if(evt.key === 'Escape')
  //   this.close()
  // }

  _handleEscClose = (evt) => {
    if(evt.key === 'Escape'){
      this.close()
    }
  }

  

  //закрытие попапа по оверлею
  _closePopupByClickOverlay(e){
    if (e.target.classList.contains('popup')){
      this.close()
    }
  };


  //слушатели попапа
  setEventListeners(){

    this._popupSelector.addEvenListeners('keydown', () => {this._handlerEscClose()});

    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {this.close()})

    // this._popupSelector.addEventListeners('click', () => {
    //   this._closePopupByClickOverlay(e)
    // })
  }
}