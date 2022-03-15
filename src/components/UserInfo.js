class UserInfo {
  constructor({nameInputSelector, jobInputSelector, avatarSelector}) {
    this._nameInputSelector = document.querySelector(nameInputSelector);
    this._jobInputSelector = document.querySelector(jobInputSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo(){ //возращает объект с данными пользователя
    return {
      name: this._nameInputSelector.textContent,
      about: this._jobInputSelector.textContent
    }
    
  }

  setUserInfo(name, about){ //принимает новые данные и добавляет их на страницу
    this._nameInputSelector.textContent = name;
    this._jobInputSelector.textContent = about;
    }
  }

  export default UserInfo