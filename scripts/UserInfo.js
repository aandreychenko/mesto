export default class UserInfo {
  constructor({name, caption}) {
    this._name = name;
    this._caption = caption;
  }

  getUserInfo = () => {
    return {
      name: this._name,
      caption: this._caption
    }
  }

  setUserInfo = (newName, newCaption) => {
    this._name = newName;
    this._caption = newCaption;
  }

  updateUserInfo = () => {
    this._nameElem.textContent = this._name;
    this._captionElem.textContent = this._caption;
  }
}