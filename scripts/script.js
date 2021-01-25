import {initialCards} from './initial-cards.js';
import Card from './Card.js';
import {validationConfig, FormValidator} from './FormValidator.js';

//PROFILE EDIT
//Profile edit elements
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupProfileEditCloseIcon = document.querySelector('.popup__close-icon_profile-edit');
const popupProfileEditContainer = document.querySelector('.popup__container_profile-edit');
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const popupProfileEditName = document.querySelector('.popup__name_profile-edit');
const popupProfileEditCaption = document.querySelector('.popup__caption_profile-edit');

//Profile edit events
profileEditButton.addEventListener('click', showProfileEditPopup);

popupProfileEditCloseIcon.addEventListener('click', function() {
  closePopup(popupProfileEdit)
});

popupProfileEditContainer.addEventListener('submit', setNewProfileInfo);

//Profile edit functions
function showProfileEditPopup() {
  popupProfileEditName.value = profileName.textContent;
  popupProfileEditCaption.value = profileCaption.textContent;
  new FormValidator(popupProfileEdit, validationConfig)
      .enableValidation(popupProfileEdit);
  openPopup(popupProfileEdit);
}

function setNewProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileEditName.value;
  profileCaption.textContent = popupProfileEditCaption.value;
  closePopup(popupProfileEdit);
}

//PLACE CARDS ADDING
//Elements of adding place card functionality
const addPlaceButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupAddPlaceCloseIcon = document.querySelector('.popup__close-icon_add-place');
const popupAddPlaceContainer = document.querySelector('.popup__container_add-place');
const popupAddPlaceName = document.querySelector('.popup__name_add-place');
const popupAddPlaceLink = document.querySelector('.popup__caption_add-place');

//Place card adding form events
addPlaceButton.addEventListener('click', function() {
  openPopup(popupAddPlace);
  new FormValidator(popupAddPlace, validationConfig)
      .enableValidation(popupAddPlace);
});

popupAddPlaceCloseIcon.addEventListener('click', function() {
  closePopup(popupAddPlace);
});

popupAddPlaceContainer.addEventListener('submit', placeCardPublic);

//Place card functions
//Publishing card from the adding form
function placeCardPublic(evt) {
  evt.preventDefault();
  const item = {name: popupAddPlaceName.value, link: popupAddPlaceLink.value};
  const card = new Card(item, '#element');
  addCard(elementsContainer, card.generateCard());
  closePopup(popupAddPlace);
  popupAddPlaceContainer.reset();
}

function addCard(container, card) {
  container.prepend(card);
}

//IMAGE VIEWER
//Image viewer elements
const popupImage = document.querySelector('.popup_image');
const popupImageCloseButton = document.querySelector('.popup__close-icon_image');

//Image viewer events
popupImageCloseButton.addEventListener('click', function() {
  closePopup(popupImage);
});

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

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', function(evt) {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

//INITIAL CARDS RENDER
//Initial cards elements
const elementsContainer = document.querySelector('.elements');

//Initial cards producing
initialCards.forEach(function (item) {
  const card = new Card(item, '#element');
  addCard(elementsContainer, card.generateCard());
});

//EXPORTING FUNCTIONS
export { openPopup };