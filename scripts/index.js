//функции открытия и закрытия
function openPopup(popup){
popup.classList.add('popup_opened')
}

function closePopup (popup){
  popup.classList.remove('popup_opened')
}

//закрытие попапа при клике в любом месте страницы (оверлее)
function closePopupByClickOverlay(event) {
  if (event.target === event.currentTarget)
  classList.remove('popup_opened');
}

// Находим форму в DOM
const popupContainer = document.querySelector('.popup__container');
const popupForm = popupContainer.querySelector('.popup__form');

// Находим поля формы в DOM
const nameInput = popupForm.querySelector('.popup__input_type_name');
const jobInput = popupForm.querySelector('.popup__input_type_description');

//находим форму поля странице
const profileNameForm = document.querySelector('.profile__name');	
const profileJobForm = document.querySelector('.profile__job');

//попап профиля
const profilePopup = document.querySelector('.popup_type_profile');
const buttonProfilePopupOpen = document.querySelector('.profile__change');
buttonProfilePopupOpen.addEventListener('click', () =>
  openPopup(profilePopup)
)

let buttonPopupClose = profilePopup.querySelector('.popup__close');
buttonPopupClose.addEventListener('click', () =>
  closePopup(profilePopup)
);

function changeInform(evt) {
  evt.preventDefault();
profileNameForm.textContent = nameInput.value;
profileJobForm.textContent = jobInput.value;
closePopup(profilePopup);
}

popupForm.addEventListener('submit', changeInform);


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
const popupImage = document.querySelector('.popup_type_image');
const buttonOpenPhoto = document.querySelector('.elements__photo');
buttonPopupClose = popupImage.querySelector('.popup__close');

buttonOpenPhoto.addEventListener('click', ()=>{
  openPopup(popupImage);
  document.querySelector('.popup__image-photo').src = element.link
})


buttonPopupClose.addEventListener('click', ()=>
closePopup(popupImage));

}

//попап добавления карточки
const popupCardsButtonOpenForm = document.querySelector('.profile__add');
const popupCards = document.querySelector('.popup_type_cards');
buttonPopupClose = popupCards.querySelector('.popup__close');

popupCardsButtonOpenForm.addEventListener('click', ()=>
  openPopup(popupCards)
);

buttonPopupClose.addEventListener('click', () =>
  closePopup(popupCards)
);

const popupCardsContainer = popupCards.querySelector('.popup__container');
const popupCardsForm = popupCardsContainer.querySelector('.popup__form');
const placeNameInput = popupCards.querySelector('.popup__input_type_name');
const placeLinkInput = popupCards.querySelector('.popup__input_type_description');

popupCardsForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  createCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  }); 
  popupCardsForm.reset();
  closePopup(popupCards)
});