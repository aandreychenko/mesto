import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._handleFormSubmit = null;
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitCallback = (callback) => {
    this._handleFormSubmit = callback;
  }

  setEventListeners(handleFormSubmit) {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
