//переменные
const popupProfile = document.querySelector('.popup_type_profile')
const popupContainerProfile = popupProfile.querySelector('.popup__container');
const popupFormProfile = popupContainerProfile.querySelector('.popup__form');
const nameInput = popupFormProfile.querySelector('.popup__input_type_name');
const jobInput = popupFormProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');	
const profileJob = document.querySelector('.profile__job');
const buttonProfilePopupOpen = document.querySelector('.profile__change')



//функции открытия и закрытия
function openPopup(popup){
  popup.classList.add('popup_opened')
}

function closePopup (popup){
  popup.classList.remove('popup_opened')
}

// Находим форму в DOM


// Находим поля формы в DOM


//находим форму поля странице


//попап профиля
;
buttonProfilePopupOpen.addEventListener('click', () =>
  openPopup(popupProfile)
)

const buttonPopupClosePopupProfile = popupProfile.querySelector('.popup__close');
buttonPopupClosePopupProfile.addEventListener('click', () =>
  closePopup(popupProfile)
);

function changeInformationProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

popupFormProfile.addEventListener('submit', changeInformationProfile);


//добавление карточки через js
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

//удаляем карточку
  buttonDelete.addEventListener('click', ()=>{
    cardsTemplateClone.remove();
  })

//лайкаем карточку
  buttonLike.addEventListener('click', ()=>{
    buttonLike.style.backgroundImage = 'url(../blocks/elements/__button-like/Union.svg)';
  })

//открытие и закрытие фото
  const popupImage = document.querySelector('.popup_type_image');
  const buttonOpenPhoto = cardsTemplateClone.querySelector('.elements__photo');
  const buttonPopupPhotoClose = popupImage.querySelector('.popup__close');

  buttonOpenPhoto.addEventListener('click', ()=>{
    openPopup(popupImage);
    popupImage.querySelector('.popup__image-photo').src = element.link
  })

  buttonPopupPhotoClose.addEventListener('click', ()=>
  closePopup(popupImage));

  return cardsTemplateClone
}

const renderCard = (element) => {
  const card = createCard (element);
  cards.prepend (card)
}


//попап добавления карточки
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup_type_cards');
const buttonPopupCardsClose = popupCards.querySelector('.popup__close');

popupCardsButtonOpenForm.addEventListener('click', ()=>
  openPopup(popupCards)
);

buttonPopupCardsClose.addEventListener('click', ()=>
  closePopup(popupCards)
);

const popupCardsContainer = popupCards.querySelector('.popup__container');
const popupCardsForm = popupCardsContainer.querySelector('.popup__form');
const placeNameInput = popupCards.querySelector('.popup__input_type_name');
const placeLinkInput = popupCards.querySelector('.popup__input_type_description');

popupCardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  }); 
  popupCardsForm.reset();
  closePopup(popupCards)
});