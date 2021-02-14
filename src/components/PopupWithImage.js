import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(image, captionText) {
    const popupImage = this._popup.querySelector('.popup__image');
    popupImage.src = image;
    popupImage.alt = captionText;
    const caption = this._popup.querySelector('.popup__image-caption');
    caption.textContent = captionText;
    super.open();
  }
}
