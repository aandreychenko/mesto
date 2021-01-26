//POPUP OPENING AND CLOSING
const easyClose = function (evt) {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupActive);
  }
}

//Show popup function
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', easyClose);
}

//Close popup function
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', easyClose);
}

export {openPopup, closePopup};