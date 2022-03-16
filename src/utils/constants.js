//переменные
export const popupProfile = document.querySelector('.popup_type_profile')
const popupContainerProfile = popupProfile.querySelector('.popup__container');
const popupFormProfile = popupContainerProfile.querySelector('.popup__form');
export const nameInput = popupFormProfile.querySelector('.popup__input_type_name');
export const jobInput = popupFormProfile.querySelector('.popup__input_type_description');
export const buttonProfilePopupOpen = document.querySelector('.profile__change');
export const popupCardsButtonOpenForm = document.querySelector('.profile__add');
export const popupCards = document.querySelector('.popup_type_cards');
export const popupAvatarButtonOpen = document.querySelector('.avatar');
export const popupAvatar = document.querySelector('.popup_type_avatar');

//массив валдации
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-save',
  inactiveButtonClass: 'popup__form-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}