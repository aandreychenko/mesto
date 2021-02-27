export default class UserInfo {
  constructor({nameElementSelector, captionElementSelector, userImage}) {
    this._nameElement = document.querySelector(`.${nameElementSelector}`);
    this._captionElement = document.querySelector(`.${captionElementSelector}`);
    this._userImage = document.querySelector(`.${userImage}`);
    this._name = '';
    this._about = '';
    this._avatar = '';
    this._id = '';
  }

  getUserInfo = () => {
    return {
      name: this._nameElement.textContent,
      about: this._captionElement.textContent
    }
  }

  setUserInfo = ({name, about, avatar, _id}) => {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
  }

  updateUserInfo = () => {
    this._nameElement.textContent = this._name;
    this._captionElement.textContent = this._about;
    this._userImage.src = this._avatar;
  }
}
