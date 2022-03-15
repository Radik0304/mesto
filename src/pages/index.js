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
  // console.log(res._id);
  user.setUserInfo(res.name, res.about, res.avatar)

  userId = res._id;
});


//забираем карточки с сервера
api.getInitialCards()
.then(section => {
  section.forEach(data => {
    newCardMaker(data, undefined, cardsList);
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
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

//массив валдации
export const settings = {
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

//уведомление о процессе загрузки
export function renderLoading(loading) {
  if (loading) {
      Array.from(document.querySelectorAll('.popup__form-save')).forEach((submit) => {
          submit.textContent = "Сохранение...";
      })
  } else {
      Array.from(document.querySelectorAll('.popup__form-save')).forEach((submit) => {
          submit.textContent = "Сохранить";
      })
  }
}

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

//попап добавления карточки
const popupCardsAdd = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    renderLoading(true);
  api.addNewCard(data.nameplace, data.photolink)
  .then(res => {
    newCardMaker(res,'.card-template', cardsList);
   });
  }
});

//данные профиля
const user = new UserInfo({nameInputSelector: '.profile__name', 
jobInputSelector: '.profile__job', 
avatarSelector: '.profile__avatar'});

//попап изменения информации
const popupProfileChange = new PopupWithForm('.popup_type_profile', {
  handleFormSubmit: (data) => {
    // console.log(data)
    renderLoading(true);
    api.editProfile(data.kusto, data.discover)
    .then(res => { 
      // console.log('res', res);
      user.setUserInfo(res.name, res.about,res.avatar);
      console.log(res)
    });
    popupProfileChange.close();
  }
})

//попап аватара
const popupAvatarChange = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    renderLoading(true);
    api.changeAvatar(data)
    .then(res => {
      user.setUserInfo(res.name, res.about, res.avatar)
      popupAvatarChange.close()
    })
  }
});

//попап подтверждения удаления
const popupConfirmationDelete = new PopupWithForm('.popup_type_confirmation', 
{
  handleFormSubmit: () => {
  }
});





//создание новой карточки
function newCardMaker(data, undefined, cardsList){
  const newCard = new Card(
    { 
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    }, 
    '.card-template', 
    {handleCardClick: () => popupImageOpen.open(data.link, data.name)},
    (id) => {
      popupConfirmationDelete.open();
      popupConfirmationDelete.changeSubmitHandler(() => {
        console.log(id);
        api.deleteCard(id)
          .then(res => { 
            console.log('res', res)
            newCard.deleteCard();
            popupConfirmationDelete.close()
          })

      })
    }, 
    (id) => {
      if(newCard.isLiked()){
        api.deleteLike(id)
        .then(res => {
          newCard.setLikes(res.likes)
        })
      }
      else{
        api.putLike(id)
        .then(res => {
          newCard.setLikes(res.likes)
        })
      }
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