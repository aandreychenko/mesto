//Validation configuration object
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

class FormValidator {
  constructor(formSelector, validationConfig) {
    this.formSelector = formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
  }

  //Showing error message and marking input field
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

//Hiding error message and unmarking input field
  _hideInputError = (inputElement) => {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //Checking input validity
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Checking if some of the inputs are invalid
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Toggling button state
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    }
    else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  //Setting event listeners
  _setEventListeners = () => {
    const inputList = Array.from(this.formSelector.querySelectorAll(this._inputSelector));
    const buttonElement = this.formSelector.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation = () => {
    this.formSelector.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
    this._setEventListeners();
    }

  resetValidation = () => {
    const inputList = Array.from(this.formSelector.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
  }
}

export {validationConfig, FormValidator};