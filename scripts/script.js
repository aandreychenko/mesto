//GLOBAL ELEMENTS
const popupInputList = (container) => {
  return Array.from(container.querySelectorAll('.popup__field'));
}

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
const popupProfileEditSubmitButton = document.querySelector('.popup__submit-button_profile-edit');

//Profile edit events
profileEditButton.addEventListener('click', showProfileEditPopup);

popupProfileEditCloseIcon.addEventListener('click', function() {
  closePopup(popupProfileEdit)
});

popupProfileEditContainer.addEventListener('submit', setNewProfileInfo);

//Profile edit functions
const validationCheck = (container, config) => {
  popupInputList(container).forEach((input) => {
    checkInputValidity(container, input, config);
  });
}

function showProfileEditPopup() {
  popupProfileEditName.value = profileName.textContent;
  popupProfileEditCaption.value = profileCaption.textContent;
  validationCheck(popupProfileEditContainer, validationConfig);
  toggleButtonState(popupInputList(popupProfileEditContainer), popupProfileEditSubmitButton, validationConfig);
  openPopup(popupProfileEdit);
}

function setNewProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileEditName.value;
  profileCaption.textContent = popupProfileEditCaption.value;
  closePopup(popupProfileEdit);
}

//PLACE CARDS
//Place card elements
const addPlaceButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupAddPlaceCloseIcon = document.querySelector('.popup__close-icon_add-place');
const popupAddPlaceContainer = document.querySelector('.popup__container_add-place');
const popupAddPlaceName = document.querySelector('.popup__name_add-place');
const popupAddPlaceLink = document.querySelector('.popup__caption_add-place');
const popupAddPlaceSubmitButton = document.querySelector('.popup__submit-button_add-place')

//Place card events
addPlaceButton.addEventListener('click', function() {
  openPopup(popupAddPlace);
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
  makePlaceCard (item);
  closePopup(popupAddPlace);
  popupAddPlaceContainer.reset();
  toggleButtonState(popupInputList(popupAddPlaceContainer), popupAddPlaceSubmitButton, validationConfig);
}

//Function that makes place cards
function makePlaceCard (item) {
  const placeCard = elementTemplate.cloneNode(true);
  //Assigning image source and place name
  placeCard.querySelector('.element__image').src = item.link;
  placeCard.querySelector('.element__place-name').textContent = item.name;
  //Adding like function
  placeCard.querySelector('.element__like-button')
      .addEventListener('click', function() {
        this.classList.toggle('element__like-button_active')
      });
  //Adding card deleting function
  placeCard.querySelector('.element__trash-button')
      .addEventListener('click', function() {
        this.parentElement.remove();
      });
  //Adding image viewer popup function
  placeCard.querySelector('.element__image')
      .addEventListener ('click', function showImagePopup() {
        popupImageView.src = this.src;
        const element = this.parentElement;
        const placeName = element.querySelector('.element__place-name');
        popupImageCaption.textContent = placeName.textContent;
        openPopup(popupImage);
      });

  elementsContainer.prepend(placeCard);
}

//IMAGE VIEWER
//Image viewer elements
const popupImage = document.querySelector('.popup_image');
const popupImageView = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
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
const elementTemplate = document.querySelector('#element').content;

//Initial cards producing
initialCards.forEach(makePlaceCard);