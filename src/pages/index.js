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
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup_type_cards');
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

//переменные валидаций 
const changeInform= new FormValidator(settings, popupProfile);
const addCardForm = new FormValidator(settings, popupCards);

//фотопопап
const popupImageOpen = new PopupWithImage('.popup_type_image');

//добавляем карточки на страницу
const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
      newCardMaker(data, '.card-template', cardsList)
    }
  },
  '.elements');

cardsList.renderItems(); // перебираем массив

//попап добавления карточки
const popupCardsAdd = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    newCardMaker({name: data.nameplace, link: data.photolink}, '.card-template', cardsList);
  }
});

//данные профиля
const user = new UserInfo({nameInputSelector: '.profile__name', jobInputSelector: '.profile__job'});

//попап изменения информации
const popupProfileChange = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    popupProfileChange.close();
    user.setUserInfo(data.kusto, data.discover);
  }
})

//создание новой карточки
function newCardMaker(data, undefined, cardsList){
  const newCard = new Card(data, '.card-template', 
    {handleCardClick: () => popupImageOpen.open(data.link, data.name)});
    const cardsElement = newCard.generateCard();
    cardsList.addItem(cardsElement);
}

//валидация
addCardForm.enableValidation();
changeInform.enableValidation();

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