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

function togglePopup () {
  popup.classList.toggle('popup_opened');

popupButtonEditForm.addEventListener('click', togglePopup);
popupButtonCloseForm.addEventListener('click', togglePopup);
}

//подключаем обработчика событий

popupButtonEditForm.addEventListener('click', openPopup);
popupButtonCloseForm.addEventListener('click', closePopup);
popup.addEventListener('click', closePopupByClickOverlay);

// Находим форму в DOM
let popupSelector = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupForm = popupContainer.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = popupForm.querySelector('.popup__name');
let jobInput = popupForm.querySelector('.popup__job');

//кнопка сохранить
let saveForm = popupContainer.querySelector('.popup__form-save');

//находим форму поля странице
let profileNameForm = document.querySelector('.profile__name');	
let profileJobForm = document.querySelector('profile__job');

//задаем формулу 
function changeInform(evt) {
	evt.preventDefault();

  let profileNameForm = document.querySelector('.profile__name');		
	let profileJobForm = document.querySelector('.profile__job');

  profileNameForm.textContent = nameInput.value;
  profileJobForm.textContent = jobInput.value;
}

//сохранение информации из попапа
saveForm.addEventListener('click', changeInform);
saveForm.addEventListener('click', closePopup);
saveForm.addEventListener('submuit', changeInform);
