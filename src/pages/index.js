//импорты
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirmation from '../components/PopupConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {api} from '../components/Api.js';
import {popupProfile, nameInput, jobInput, buttonProfilePopupOpen, popupCardsButtonOpenForm, popupCards, popupAvatarButtonOpen, popupAvatar, settings} from '../utils/constants.js';
import '../pages/index.css';

let userId

//забираем с сервера данные профиля и карточки
Promise.all([api.getProfile(), api.getInitialCards()])
.then(([res, section]) => {
  user.setUserInfo(res.name, res.about, res.avatar);
  userId = res._id;
  section.forEach(data => {
    newCardMaker(data, undefined, cardsList);
  })
})
.catch(console.log);

//переменные валидаций 
const changeInform= new FormValidator(settings, popupProfile);
const addCardForm = new FormValidator(settings, popupCards);
const changeAvatar = new FormValidator(settings, popupAvatar);

//фотопопап
const popupImageOpen = new PopupWithImage('.popup_type_image');

//добавляем карточки на страницу
const cardsList = new Section({
  items: [],
  renderer: (data) => {
      newCardMaker(data, '.card-template', cardsList)
    }
  },
  '.elements');

//попап добавления карточки
const popupCardsAdd = new PopupWithForm('.popup_type_cards', {
  handleFormSubmit: (data) => {
    popupCardsAdd.renderLoading(true);
  api.addNewCard(data.nameplace, data.photolink)
  .then(res => {
    newCardMaker(res,'.card-template', cardsList);
    popupCardsAdd.close();
   })
   .catch(console.log)
   .finally(() =>{
    popupCardsAdd.renderLoading(false)
    })
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
    popupProfileChange.renderLoading(true);
    api.editProfile(data.kusto, data.discover)
    .then(res => { 
      user.setUserInfo(res.name, res.about,res.avatar);
      console.log(res)
      popupProfileChange.close();
    })
    .catch(console.log)
    .finally(() =>{
      popupProfileChange.renderLoading(false);

  })
}
})

//попап аватара
const popupAvatarChange = new PopupWithForm('.popup_type_avatar', {
  handleFormSubmit: (data) => {
    popupAvatarChange.renderLoading(true);
    api.changeAvatar(data)
    .then(res => {
      user.setUserInfo(res.name, res.about, res.avatar)
      popupAvatarChange.close()
    })
    .catch(console.log)
    .finally(() =>{
      popupAvatarChange.renderLoading(false);
  })
  }
});

//попап подтверждения удаления
const popupConfirmationDelete = new PopupConfirmation('.popup_type_confirmation');

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
      popupConfirmationDelete.setFormSubmitHandler(() => {
        console.log(id);
        api.deleteCard(id)
          .then(res => { 
            console.log('res', res)
            newCard.deleteCard();
            popupConfirmationDelete.close()
          })
          .catch(console.log)
      })
    }, 
    (id) => {
      if(newCard.isLiked()){
        api.deleteLike(id)
        .then(res => {
          newCard.setLikes(res.likes)
        })
        .catch(console.log)
      }
      else{
        api.putLike(id)
        .then(res => {
          newCard.setLikes(res.likes)
        })
        .catch(console.log)
      }
    });

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
})