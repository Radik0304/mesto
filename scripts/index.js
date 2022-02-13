//импортируем классы
import Card from "./Card.js";
import FormValidator from './FormValidator.js';

//переменные
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile')
const popupContainerProfile = popupProfile.querySelector('.popup__container');
const popupFormProfile = popupContainerProfile.querySelector('.popup__form');
const nameInput = popupFormProfile.querySelector('.popup__input_type_name');
const jobInput = popupFormProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');	
const profileJob = document.querySelector('.profile__job');
const buttonProfilePopupOpen = document.querySelector('.profile__change')
const buttonPopupClosePopupProfile = popupProfile.querySelector('.popup__close')
const cards = document.querySelector('.elements');
const cardsTemplate = document.querySelector('.card-template').content;
const cardBody = cardsTemplate.querySelector('.elements__card');
const popupPhoto = document.querySelector('.popup-image');
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup_type_cards');
const buttonPopupCardsClose = popupCards.querySelector('.popup__close');
const popupCardsContainer = popupCards.querySelector('.popup__container');
const popupCardsForm = popupCardsContainer.querySelector('.popup__form');
const placeNameInput = popupCards.querySelector('.popup__input_type_name');
const placeLinkInput = popupCards.querySelector('.popup__input_type_description');
export const popupImage = document.querySelector('.popup_type_image');
const buttonPopupPhotoClose = popupImage.querySelector('.popup__close');
const popupInputs = document.querySelector('.popup__input');
const popupFormSave = popupCardsForm. querySelector('.popup__form-save');

//массив
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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-save',
  inactiveButtonClass: 'popup__form-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const changeInform= new FormValidator(settings, popupProfile);
const addCardForm = new FormValidator(settings, popupCards);

addCardForm.enableValidation();
changeInform.enableValidation();


//функции открытия и закрытия
export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupByClickOverlay); 
  document.addEventListener('keydown', closePopupByEscape);
  popupFormSave.setAttribute('disabled', true);
  popupFormSave.classList.add('popup__form-save_disabled');
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByClickOverlay); 
  document.removeEventListener('keydown', closePopupByEscape);
}

//закрытие по оверлею
function closePopupByClickOverlay(e) {
  if (e.target.classList.contains('popup')){
    closePopup(document.querySelector('.popup_opened'))
  }
};

//закрытие по Esc
function closePopupByEscape(evt) {
  if(evt.key === 'Escape')
  closePopup(document.querySelector('.popup_opened'))
};

//изменение информации
function changeInformationProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

//
const renderCard = (item) => {
  const card = new Card(item.name, item.link)
  const cardsElement = card._generateCard();

  document.querySelector('.elements').append(cardsElement);
}

//перебираем массив и создем карточки
initialCards.forEach(renderCard);

//слушатели
buttonProfilePopupOpen.addEventListener('click', () =>
  openPopup(popupProfile)
);

popupCardsButtonOpenForm.addEventListener('click', ()=>
  openPopup(popupCards)
);

buttonPopupCardsClose.addEventListener('click', ()=>
  closePopup(popupCards)
);

buttonPopupPhotoClose.addEventListener('click', ()=>
  closePopup(popupImage));

buttonPopupClosePopupProfile.addEventListener('click', () =>
  closePopup(popupProfile)
);

popupCardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  }); 
  popupCardsForm.reset();
  closePopup(popupCards)
});

popupFormProfile.addEventListener('submit', changeInformationProfile);