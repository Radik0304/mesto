class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;

    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);
  }

  //показываем текст ошибки
  _showError(inputElement, message) { 
    const error = this._form.querySelector('#' + inputElement.id + '-error');
    error.textContent = message;
    inputElement.classList.add(this._settings.inputErrorClass);
  }

  //убираем текст ошибки
  _hideError(inputElement) { 
    const error = this._form.querySelector('#' + inputElement.id + '-error');
    error.textContent = '';
    inputElement.classList.remove(this._settings.inputErrorClass);
  }
  
  //проверяет, что поле НЕ валидно
  _hasInvalidInput = () => { 
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  //отключение кнопки
  _disableSubmitButton = () => { 
    this._button.classList.add(this._settings.inactiveButtonClass);
    this._button.disabled = true; 
  }

  //включение кнопки
  _enableSubmitButton = () => { 
    this._button.classList.remove(this._settings.inactiveButtonClass);
    this._button.disabled = false; 
  }

  //измнение состоянии кнопки в зависимости от прохождения валидации
  _toggleButtonState() { 
    if (this._hasInvalidInput()){
      this._disableSubmitButton();
      }
    else {
      this._enableSubmitButton();
      }
    };

    //проверяет в целом валидность поля и выводит ошибки 
  _checkInputValidity(inputElement) { 
    if(inputElement.validity.valid) {
      this._hideError(inputElement); 
    } else {
      this._showError(inputElement, inputElement.validationMessage)
    }
  }

  //слушатели
  _setEventListeners() { 
    this._inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._button = this._form.querySelector(this._settings.submitButtonSelector);

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState()  
      })
    })
      
  }

   //отключаем кнопку отправки формы добавления карточки
  resetValidation() {
    this._form.querySelector(this._settings.submitButtonSelector).setAttribute('disabled', true);
    this._form.querySelector(this._settings.submitButtonSelector).classList.add(this._settings.inactiveButtonClass)
  }
  
   //включение валидации
  enableValidation () {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    
    this._setEventListeners()
  }
}

export default FormValidator;