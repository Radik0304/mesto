class UserInfo {
  constructor({nameInputSelector, jobInputSelector}) {
    this._nameInputSelector = nameInputSelector;
    this._jobInputSelector = jobInputSelector;
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