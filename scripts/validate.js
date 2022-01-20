enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-save',
  inactiveButtonClass: 'popup__form-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function hideError(input, config) {
  const error = document.querySelector('#' + input.id + '-error');
  error.textContent = '';
  input.classList.remove(config.inputErrorClass);
}

function showError(input, config) {
  const error = document.querySelector('#' + input.id + '-error');
  const message = input.validationMessage;
  error.textContent = message;
  input.classList.add(config.inputErrorClass);
}

function checkInputValidity(input, config) {
  if(input.validity.valid) {
    hideError(input, config);
  } else {
    showError(input, config)
  }
}

function toggleButtonState(button, inputs, config) {
  const  isFormValid = inputs.every(input => {
    return input.validity.valid;
  });

  if(isFormValid) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

function enableValidation (config) {
  const forms = [...document.querySelectorAll(config.formSelector)];

  forms.forEach(form => {
    form.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    const inputs = [...form.querySelectorAll(config.inputSelector)];
    const button = form.querySelector(config.submitButtonSelector)

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, config);
        toggleButtonState(button, inputs, config)
      })
    })
  })
}
