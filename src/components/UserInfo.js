class UserInfo {
  constructor({nameInputSelector, jobInputSelector, avatarSelector}) {
    this._name = document.querySelector(nameInputSelector);
    this._job = document.querySelector(jobInputSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo(){ //возращает объект с данными пользователя
    return {
      name: this._name.textContent,
      about: this._job.textContent,
    }
  }

  setUserInfo(name, about, avatar){ //принимает новые данные и добавляет их на страницу
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
    }
  }

  export default UserInfo