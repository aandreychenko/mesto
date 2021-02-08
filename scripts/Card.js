/*Not ready*/

import PopupWithImage from "./PopupWithImage";

export default class Card {
  constructor({data, handleCardClick}, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
        .querySelector(this._template)
        .content
        .querySelector('.element')
        .cloneNode(true);

    return cardElement;
  }

  _like() {
    this._element.querySelector('.element__like-button')
        .addEventListener('click', function() {
          this.classList.toggle('element__like-button_active')
        });
  }

  _cardDelete() {
    this._element.querySelector('.element__trash-button')
        .addEventListener('click', function() {
          this.parentElement.remove();
        });
  }

  _popupViewer() {
    this._element.querySelector('.element__image')
        .addEventListener ('click', () => {
          const popupImage = document.querySelector('.popup_image');
          const cardImage = this._element.querySelector('.element__image');
          const placeName = this._element.querySelector('.element__place-name');
          const popupWithImage = new PopupWithImage(popupImage, cardImage, placeName.textContent);
          popupWithImage.open();
        });
  }

  _setEventListeners() {
    this._like();
    this._cardDelete();
    this._popupViewer();
  }

  generateCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.element__image');
    image.src = this._link;
    image.alt =  `На фотографии — ${this._name}`;
    this._element.querySelector('.element__place-name').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}