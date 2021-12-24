//сначала задаем значения переменных путем поиска нужного селектора
const popupButtonEditForm = document.querySelector('.profile__change');
const popupButtonCloseForm = document.querySelector('.popup__close');
const popup = document.querySelector ('.popup');

//прописываем функции, которая должна будет выполнится для выбранных переменных
function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

//закрытие попапа при клипе в любом месте страницы (оверлее)
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget)
  popup.classList.remove('popup_opened');
}

//подключаем обработчика событий

popupButtonEditForm.addEventListener('click', openPopup);
popupButtonCloseForm.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupByClickOverlay);

// Находим форму в DOM

const popupContainer = popup.querySelector('.popup__container');
const popupForm = popupContainer.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = popupForm.querySelector('.popup__input_type_name');
const jobInput = popupForm.querySelector('.popup__input_type_job');

//находим форму поля странице
const profileNameForm = document.querySelector('.profile__name');	
const profileJobForm = document.querySelector('.profile__job');

//задаем формулу 
function changeInform(evt) {
	evt.preventDefault();
  profileNameForm.textContent = nameInput.value;
  profileJobForm.textContent = jobInput.value;
  closePopup();
}

//сохранение информации из попапа
popupForm.addEventListener('submit', changeInform);