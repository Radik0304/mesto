class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;

    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
  }

  _showError(inputElement, message) { //показываем текст ошибки
    const error = this._form.querySelector('#' + inputElement.id + '-error');
    error.textContent = message;
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  _hideError(inputElement) { //убираем текст ошибки
    const error = this._form.querySelector('#' + inputElement.id + '-error');
    error.textContent = '';
    inputElement.classList.remove(this._settings.inputErrorClass);
  }
  
  _hasInvalidInput = () => { //проверяет, что поле НЕ валидно
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _disableSubmitButton = () => { //отключение кнопки
    this._button.classList.add(this._settings.inactiveButtonClass);
    this._button.disabled = true; 
  }

  _enableSubmitButton = () => { //включение кнопки
    this._button.classList.remove(this._settings.inactiveButtonClass);
    this._button.disabled = false; 
  }

  _toggleButtonState() { //измнение состоянии кнопки в зависимости от прохождения валидации
    if (this._hasInvalidInput()){
      this._disableSubmitButton();
      }
    else {
      this._enableSubmitButton();
      }
    };

  _checkInputValidity(inputElement) { //проверяет в целом валидность поля и выводит ошибки 
    if(inputElement.validity.valid) {
      this._hideError(inputElement); 
    } else {
      this._showError(inputElement, inputElement.validationMessage)
    }
  }

  _setEventListeners() { //слушатели
    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState()  
      })
    })
      
  }

  enableValidation () { //включение валидации
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    
    this._setEventListeners()
  }
}

export default FormValidator;