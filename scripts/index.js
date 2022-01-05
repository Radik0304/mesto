//сначала задаем значения переменных путем поиска нужного селектора
const popupButtonEditForm = document.querySelector('.profile__change');
const popupButtonCloseForm = document.querySelector('.popup__close');
const popup = document.querySelector ('.popup');

function togglePopup(){
  popup.classList.toggle('popup_opened')
}

//закрытие попапа при клике в любом месте страницы (оверлее)
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget)
  popup.classList.remove('popup_opened');
}

//подключаем обработчика событий

popupButtonEditForm.addEventListener('click', togglePopup);
popupButtonCloseForm.addEventListener('click', togglePopup);
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

//добавление карточек через js
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.elements');
const cardsTemplate = document.querySelector('.card-template').content;
const cardBody = cardsTemplate.querySelector('.elements__card');
const popupPhoto = document.querySelector('.popup-image');



//перебор массива

initialCards.forEach(createCard);

function createCard(element){
  const cardsTemplateClone = cardBody.cloneNode(true);
  cardsTemplateClone.querySelector('.elements__name').textContent = element.name;
  cardsTemplateClone.querySelector('.elements__photo').src = element.link;
  const buttonDelete = cardsTemplateClone.querySelector('.elements__button-delete');
  const buttonLike = cardsTemplateClone.querySelector('.elements__button-like');

  cards.prepend(cardsTemplateClone);

  //удаляем карточку
  buttonDelete.addEventListener('click', ()=>{
    cardsTemplateClone.remove();
  })

  //лайкаем карточку
  buttonLike.addEventListener('click', ()=>{
    buttonLike.style.backgroundImage = 'url(../blocks/elements/__button-like/Union.svg)';
  })

  //открытие и закрытие фото
  const buttonOpenPhoto = document.querySelector('.elements__photo');
  const buttonClosePhoto = popupPhoto.querySelector('.popup-image__close');
  function togglePopupPhoto(){
    popupPhoto.classList.toggle('popup-image_opened');
    document.querySelector('.popup-image__photo').src = element.link;
  }

  function closePopupPhoto () {
    popupPhoto.classList.remove('popup-image_opened');
  }
  buttonOpenPhoto.addEventListener('click', togglePopupPhoto);
  buttonClosePhoto.addEventListener('click', closePopupPhoto);
}


//переменные для попапа карточек
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup-cards');
const popupCardsButtonCloseForm = document.querySelector('.popup-cards__close');

//открытие и закрытие попапа добавления карточек
function PopupCardsToggle() {
  popupCards.classList.toggle('popup-cards_opened');
}

//закрытие попапа при клике в любом месте страницы (оверлее)
function closePopupCardsByClickOverlay(event) {
  if (event.target === event.currentTarget)
  popupCards.classList.remove('popup-cards_opened');
}

//обработчик событий
popupCardsButtonOpenForm.addEventListener('click', PopupCardsToggle);
popupCardsButtonCloseForm.addEventListener('click', PopupCardsToggle);
popupCards.addEventListener('click', closePopupCardsByClickOverlay);

//находим форму добавление карточки
const popupCardsContainer = document.querySelector('.popup-cards__container');
const popupCardsForm = document.querySelector('.popup-cards__form');

//поля формы добавления карточек
const placeNameInput = document.querySelector('.popup-cards__input_type_name');
const placeLinkInput = document.querySelector('.popup-cards__input_type_link');

//сохранение новой карточки
popupCardsButtonSave = document.querySelector('.popup-cards__form-save');

//сохранение информации о новой карточке
popupCardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  }); 
  popupCardsForm.reset();
  PopupCardsToggle()
});