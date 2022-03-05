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

  setUserInfo(data){ //принимает новые данные и добавляет их на страницу
    this._nameInputSelector.textContent = data.name;
    this._jobInputSelector.textContent = data.about;
    }
  }

  export default UserInfo