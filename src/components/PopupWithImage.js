import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image')
    this._caption = this._popup.querySelector('.popup__image-caption');
  }

  open(image, captionText) {
    this._popupImage.src = image;
    this._popupImage.alt = captionText;
    this._caption.textContent = captionText;
    super.open();
  }
}
