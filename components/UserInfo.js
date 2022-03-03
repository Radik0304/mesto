class UserInfo {
  constructor(items) {
    this._nameInputSelector = items.nameInputSelector;
    this._aboutInputSelector = items.aboutInputSelector;
  }

  getUserInfo(){ //возращает объект с данными пользователя
    this._nameInputSelector = document.querySelector('.profile__name');
    this._aboutInputSelector = document.querySelector('.profile__job');

    this._userInfoValues = {
      this._nameInputSelector.textContent:  
    }

    
  }

  setUserInfo(){ //принимает новые данные и добавляет их на страницу

  }
}


// function changeInformationProfile(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupProfile);
// }