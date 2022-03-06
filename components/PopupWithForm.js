import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector,{handleFormSubmit}){ 
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._formSelector = this._popupSelector.querySelector('.popup__form');
    }

    //собираем данные всех полей формы
    _getInputValues(){
      this._inputs = this._formSelector.querySelectorAll('.popup__input');
    //создаем пустой объект
    this._formValues = {}

    //добавляем значения всех полей
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
      })

      //возращаем объект
      return this._formValues
    }

    close() {
      super.close();
      this._formSelector.reset()
    }

    setEventListeners() {
      super.setEventListeners();

      this._formSelector.addEventListener('submit',(evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues()); 
        this.close();
      })
    }
  }

  export default PopupWithForm