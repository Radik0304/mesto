//импортируем классы
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {api} from '../components/Api.js';

let userId

api.getProfile()
.then(res => {
  // console.log(res)
  user.setUserInfo(res.name, res.about)

  userId = res._id;
});

//забираем карточки с сервера
api.getInitialCards()
.then(section => {
  // console.log('section', section);
  section.forEach(data => {
    // console.log(data._id)
    newCardMaker(data, undefined, cardsList);
    // cardsList.renderItems(); // перебираем массив
  })
})

//подключаем css
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
const popupAvatarButtonOpen = document.querySelector('.avatar');
const popupAvatar = document.querySelector('.popup_type_avatar');


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
const changeAvatar = new FormValidator(settings, popupAvatar);

//фотопопап
const popupImageOpen = new PopupWithImage('.popup_type_image');

//добавляем карточки на страницу
const cardsList = new Section({
  items: [], //initialCards
  renderer: (data) => {
      newCardMaker(data, '.card-template', cardsList)
    }
  },
  '.elements');

// cardsList.renderItems(); // перебираем массив

//попап добавления карточки
const popupCardsAdd = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    // newCardMaker({name: data.nameplace, link: data.photolink}, '.card-template', cardsList);
  
  api.addNewCard(data.nameplace, data.photolink)
  .then(res => {
    // console.log(res._id)
    newCardMaker(res,
       '.card-template', cardsList);
   })
  }
});

//данные профиля
const user = new UserInfo({nameInputSelector: '.profile__name', jobInputSelector: '.profile__job'});

//попап изменения информации
const popupProfileChange = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    api.editProfile(data.kusto, data.discover)
    .then(res => { 
      console.log('res', res);
      user.setUserInfo(data.kusto, data.discover);
    });

    popupProfileChange.close();
  }
})

//попап аватара
const popupAvatarChange = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: () => {
    popupAvatarChange.close()
  }
});

//попап подтверждения удаления
const popupConfirmationDelete = new PopupWithForm('.popup_type_confirmation', 
{
  handleFormSubmit: () => {
    // api.deleteCard(id);
  }
});

//создание новой карточки
function newCardMaker(data, undefined, cardsList){
  const newCard = new Card(
    data, 
    '.card-template', 
    {handleCardClick: () => popupImageOpen.open(data.link, data.name)},
    (id) => {
      console.log("id",id)
      popupConfirmationDelete.open();
      popupConfirmationDelete.changeSubmitHandler(() => {
        console.log(id)
        api.deleteCard(id)
          .then(res => {
            console.log('res', res)
            newCard.deleteCard();
            popupConfirmationDelete.close()
          })
      })
    }, 
    (id) => {
      api.putLike(id)
      .then(res => {
        console.log(res)
      })
    }
    );

    const cardsElement = newCard.generateCard();
    cardsList.addItem(cardsElement);

}

//валидация
addCardForm.enableValidation();
changeInform.enableValidation();
changeAvatar.enableValidation();

//слушатели
popupProfileChange.setEventListeners(); //слушатель на попап изменения профиля

popupImageOpen.setEventListeners(); // ставим слушателей на карточки

popupCardsAdd.setEventListeners(); //ставим слушателей на попап добавления карточек

popupAvatarChange.setEventListeners(); //ставим слушателей на попап аватара

popupConfirmationDelete.setEventListeners(); //ставим слушателей на попап подтверждения удаления

popupAvatarButtonOpen.addEventListener('click', ()=> { //сушатель на кноку открытия попапа аватара
  changeAvatar.resetValidation();
  popupAvatarChange.open();
});

// document.querySelector('.elements__button-delete').addEventListener('click', () => {
//   popupConfirmationDelete.open();
// })

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