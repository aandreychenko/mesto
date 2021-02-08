import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, image, caption) {
    super(popupSelector);
    this._image = image;
    this._caption = caption;
  }

  open() {
    const image = this._popup.querySelector('.popup__image');
    image.src = this._image.src;
    image.alt = this._image.alt;
    const caption = this._popup.querySelector('.popup__image-caption');
    caption.textContent = this._caption;
    super.open();
  }
}