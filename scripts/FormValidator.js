class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-save',
    inactiveButtonClass: 'popup__form-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }

  _getForm() { //получаем селектор формы
    const form = document.querySelector('.popup')
    .content
    .querySelector('.popup__form')
    .cloneNode(true)

    return form
  }

  //генерируем форму

  _generateForm() {
    this._form = this._getForm();
    //  добавить слушателя сюда
  }

  _hideError() {
    const error = this._form.querySelector('#' + this._settings.inputSelector.id + '-error');
    error.textContent = '';
    this._inputSelector.classList.remove('.popup__input_type_error');
  }

  _showError() {
    const error = this._form.querySelector('#' + this._settings.inputSelector.id + '-error');
    const message = this.settings.inputSelector.id.validationMessage;
    error.textContent = message;
    this.settings.inputSelector.classList.add('.popup__input_type_error');
    }

  _checkInputValidity() {
    if(this.settings.inputSelector.validity.valid) {
      this._hideError();
    } else {
      this._showError();
      this._inavctiveSubmitButton();
    }
  }

  _inavctiveSubmitButton() {
    this._submitButtonSelector.classList.add(this.inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners()
  };      

  _setEventListeners() {
    const inputs = document.querySelectorAll(this.settings.inputSelector);
    
    inputs.forEach(inputs => {
      inputs.addEventListener('input', () => {
        checkInputValidity();
      })
    })
  }
}



export default FormValidator;