import Popup from './Popup.js';

class PopupWithForm extends Popup{
    constructor(popupSelector,{handleFormSubmit}){ 
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popupSelector.querySelector('.popup__form');
      this._inputs =  this._form.querySelectorAll('.popup__input');
      this._buttonsSave =  this._form.querySelectorAll('.popup__form-save');
    }

    //собираем данные всех полей формы
    _getInputValues(){
    //создаем пустой объект
    this._formValues = {}

    //добавляем значения всех полей
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
      })

      //возращаем объект
      return this._formValues
    }

    changeSubmitHandler(newhandleFormSubmit){
      this._handleFormSubmit = newhandleFormSubmit
    }

    close() {
      super.close();
      this._form.reset()
    }

    renderLoading(loading) {
      if (loading) {
          Array.from(this._buttonsSave).forEach((submit) => {
              submit.textContent = "Сохранение...";
          })
      } else {
          Array.from(this._buttonsSave).forEach((submit) => {
              submit.textContent = "Сохранить";
          })
      }
    }

    setEventListeners() {
      super.setEventListeners();

      this._form.addEventListener('submit',(evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues()); 
        this.close();
      })
    }
  }

  export default PopupWithForm