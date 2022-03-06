//импортируем классы
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//переменные
/*const popup = document.querySelector('.popup');*/
const popupProfile = document.querySelector('.popup_type_profile')
const popupContainerProfile = popupProfile.querySelector('.popup__container');
const popupFormProfile = popupContainerProfile.querySelector('.popup__form');
const nameInput = popupFormProfile.querySelector('.popup__input_type_name');
const jobInput = popupFormProfile.querySelector('.popup__input_type_description');
export const profileName = document.querySelector('.profile__name');	
export const profileJob = document.querySelector('.profile__job');
const buttonProfilePopupOpen = document.querySelector('.profile__change');

export const buttonPopupClose= document.querySelector('.popup__close');

const cards = document.querySelector('.elements');
const cardsTemplate = document.querySelector('.card-template').content;
const cardBody = cardsTemplate.querySelector('.elements__card');
const popupPhoto = document.querySelector('.popup-image');
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup_type_cards');
/*const buttonPopupCardsClose = popupCards.querySelector('.popup__close');*/
const popupCardsContainer = popupCards.querySelector('.popup__container');
const popupCardsForm = popupCardsContainer.querySelector('.popup__form');
const placeNameInput = popupCards.querySelector('.popup__input_type_name');
const placeLinkInput = popupCards.querySelector('.popup__input_type_description');
export const popupImage = document.querySelector('.popup_type_image');
/*const buttonPopupPhotoClose = popupImage.querySelector('.popup__close');*/
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
/*export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('click', closePopupByClickOverlay); 
  document.addEventListener('keydown', closePopupByEscape);
  popupFormSave.setAttribute('disabled', true);
  popupFormSave.classList.add('popup__form-save_disabled');
}*/

/*function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closePopupByClickOverlay); 
  document.removeEventListener('keydown', closePopupByEscape);
}*/

//закрытие по оверлею
/*function closePopupByClickOverlay(e) {
  if (e.target.classList.contains('popup')){
    closePopup(document.querySelector('.popup_opened'))
  }
};*/

//закрытие по Esc
/*function closePopupByEscape(evt) {
  if(evt.key === 'Escape')
  closePopup(document.querySelector('.popup_opened'))
};*/

//изменение информации
// function changeInformationProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupProfile);
// }

//создание новой карточки
function newCardMaker(data, cardsTemplate, cardsList){
  const newCard = new Card(data, cardsTemplate, 
    {handleCardClick: () => popupImageOpen.open(data.name, data.link)})
    const cardsElement = newCard.generateCard();
    cardsList.addItem(cardsElement)
}

//формируем карточки
const popupImageOpen = new PopupWithImage(popupImage);
const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
      newCardMaker(data, cardsTemplate, cardsList)
    }
  },
  cards);

cardsList.renderItems(); // перебираем массив





//попап добавления карточки
const popupCardsAdd = new PopupWithForm(popupCards, {
  handleFormSubmit: (data) => {
    newCardMaker(data, cardsTemplate, cardsList);
  }
});

//данные профиля
const userInfo = new UserInfo({nameInputSelector: nameInput, jobInputSelector: jobInput});

//попап изменения информации
const popupProfileChange = new PopupWithForm(popupProfile, {
  handleFormSubmit: (data) => {
    popupProfileChange.close();
    userInfo.setUserInfo(data.name, data.about);
  }
})

//слушатели
popupProfileChange.setEventListeners(); //слушатель на попап изменения профиля

popupImageOpen.setEventListeners(); // ставим слушателей на карточки

popupCardsAdd.setEventListeners(); //ставим слушателей на попап добавления карточек

popupCardsButtonOpenForm.addEventListener('click', ()=> { //слушатель на кнопку открытия попапа
  popupCardsAdd.open()
});

buttonProfilePopupOpen.addEventListener('click', () => {//кнопка открытия попапа профиля
  popupProfileChange.open();
   const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;

});

// popupCardsAdd.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   renderCard({
//     name: placeNameInput.value,
//     link: placeLinkInput.value
//   }); 
//   popupCardsAdd.reset();
//   closeP(popupCards)
// });

// popupFormProfile.addEventListener('submit', changeInformationProfile);

//формируем тело карточки
// const renderCard = (data) => {
//   const card = new Card(data)
//   const cardsElement = card._generateCard();

//   document.querySelector('.elements').append(cardsElement);
// }