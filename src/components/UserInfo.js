export default class UserInfo {
  constructor({name, caption}) {
    this._name = name;
    this._caption = caption;
    this._nameElement = document.querySelector(this._name);
    this._captionElement = document.querySelector(this._caption);
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      caption: this._captionElement.textContent
    }
  }

  setUserInfo = (newName, newCaption) => {
    this._nameElement.textContent = newName;
    this._captionElement.textContent = newCaption;
  }
}
