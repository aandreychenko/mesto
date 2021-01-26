import {openPopup} from "./utils/utils.js";

export default class Card {
  constructor(data, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = template;
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
        .addEventListener ('click', function showImagePopup() {
          const popupImage = document.querySelector('.popup_image');
          const popupImageView = document.querySelector('.popup__image');
          const popupImageCaption = document.querySelector('.popup__image-caption');
          popupImageView.src = this.src;
          popupImageView.alt = this.alt;
          const element = this.parentElement;
          const placeName = element.querySelector('.element__place-name');
          popupImageCaption.textContent = placeName.textContent;
          openPopup(popupImage);
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