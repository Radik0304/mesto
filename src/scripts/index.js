//импортируем классы
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//подкллючаем css
import '../pages/index.css';

//переменные
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
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup_type_cards');
const placeNameInput = popupCards.querySelector('.popup__input_type_name');
const placeLinkInput = popupCards.querySelector('.popup__input_type_description');
export const popupImage = document.querySelector('.popup_type_image');

//массив карточек
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

//массив валдации
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-save',
  inactiveButtonClass: 'popup__form-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//валидируем 
const changeInform= new FormValidator(settings, popupProfile);
const addCardForm = new FormValidator(settings, popupCards);
addCardForm.enableValidation();
changeInform.enableValidation();

//фотопопап
const popupImageOpen = new PopupWithImage(popupImage);

//добавляем карточки на страницу
const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
      newCardMaker(data, cardsTemplate, cardsList)
    }
  },
  cards);

cardsList.renderItems(); // перебираем массив

//создание новой карточки
function newCardMaker(data, cardsTemplate, cardsList){
  const newCard = new Card(data, cardsTemplate, 
    {handleCardClick: () => popupImageOpen.open(data.link, data.name)});
    const cardsElement = newCard.generateCard();
    cardsList.addItem(cardsElement)
}

//попап добавления карточки
const popupCardsAdd = new PopupWithForm(popupCards, {
  handleFormSubmit: (data) => {
    newCardMaker({name: placeNameInput.value, link: placeLinkInput.value}, cardsTemplate, cardsList);
  }
});

//данные профиля
const user = new UserInfo({nameInputSelector: profileName, jobInputSelector: profileJob});

//попап изменения информации
const popupProfileChange = new PopupWithForm(popupProfile, {
  handleFormSubmit: (data) => {
    popupProfileChange.close();
    user.setUserInfo(data.kusto, data.discover);
  }
})

//слушатели
popupProfileChange.setEventListeners(); //слушатель на попап изменения профиля

popupImageOpen.setEventListeners(); // ставим слушателей на карточки

popupCardsAdd.setEventListeners(); //ставим слушателей на попап добавления карточек

popupCardsButtonOpenForm.addEventListener('click', ()=> { //слушатель на кнопку открытия попапа добавления карточки
  addCardForm.resetValidation()
  popupCardsAdd.open()
});

buttonProfilePopupOpen.addEventListener('click', () => {//кнопка открытия попапа профиля
  popupProfileChange.open();
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.about;
});