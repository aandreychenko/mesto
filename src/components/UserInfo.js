export default class UserInfo {
  constructor({name, caption}) {
    this._existName = name;
    this._existCaption = caption;
    this._name = '';
    this._caption = '';
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
        this._existName = this._name;
    this._existCaption = this._caption;
  }
}
