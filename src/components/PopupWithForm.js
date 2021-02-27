import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._handleFormSubmit = '';
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners(handleFormSubmit) {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close = () => {
    super.close();
    this._form.reset();
  }
}
