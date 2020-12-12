//For profile edit functioning
let profileEditButton = document.querySelector('.profile__edit-button');
let popupProfileEdit = document.querySelector('.popup_profile-edit');
let popupProfileEditCloseIcon = document.querySelector('.popup__close-icon_profile-edit');
let popupProfileEditContainer = document.querySelector('.popup__container_profile-edit');

let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let popupProfileEditName = document.querySelector('.popup__name_profile-edit');
let popupProfileEditCaption = document.querySelector('.popup__caption_profile-edit');

//Edit profile popup
function showProfileEditPopup() {
  popupProfileEditName.value = profileName.textContent;
  popupProfileEditCaption.value = profileCaption.textContent;
  popupProfileEdit.classList.add('popup_opened');
}

function closeProfileEditPopup() {
  popupProfileEdit.classList.remove('popup_opened');
}

function setNewProfileInfo() {
  event.preventDefault();
  profileName.textContent = popupProfileEditName.value;
  profileCaption.textContent = popupProfileEditCaption.value;
  closeProfileEditPopup();
}

//Buttons settings
profileEditButton.addEventListener('click', showProfileEditPopup);
popupProfileEditCloseIcon.addEventListener('click', closeProfileEditPopup);
popupProfileEditContainer.addEventListener('submit', setNewProfileInfo);




//Place add buttons and forms
let addPlaceButton = document.querySelector('.profile__add-button');
let popupAddPlace = document.querySelector('.popup_add-place');
let popupAddPlaceCloseIcon = document.querySelector('.popup__close-icon_add-place');
let popupAddPlaceContainer = document.querySelector('.popup__container_add-place');
let popupAddPlaceName = document.querySelector('.popup__name_add-place');
let popupAddPlaceLink = document.querySelector('.popup__caption_add-place');

//Place card adding
function showAddPlacePopup() {
  popupAddPlace.classList.add('popup_opened');
}

function closeAddPlacePopup() {
  popupAddPlace.classList.remove('popup_opened');
}

function placeCardPublic() {
  event.preventDefault();
  let item = {name: popupAddPlaceName.value, link: popupAddPlaceLink.value};
  makePlaceCard (item);
  like();
  deleteCard();
  imageViewport();
  closeAddPlacePopup();
  popupAddPlaceName.value = '';
  popupAddPlaceLink.value = '';
}


// Кнопки вызова формы и кнопки на форме
addPlaceButton.addEventListener('click', showAddPlacePopup);
popupAddPlaceCloseIcon.addEventListener('click', closeAddPlacePopup);

//Кнопка добавления карточки
popupAddPlaceContainer.addEventListener('submit', placeCardPublic);



//Like function
function like() {
  document.querySelectorAll('.element__like-button')
      .forEach(function(button) {
        button.addEventListener('click', function() {
          console.log(this);
          this.classList.toggle('element__like-button_active')
        });
      });
}

//Render of initial cards
//Initial cards source
const initialCards = [
  {
    name: 'Минск',
    link: './images/element__image-minsk.jpg'
  },
  {
    name: 'Калининград',
    link: './images/element__image-kaliningrad.jpg'
  },
  {
    name: 'Москва',
    link: './images/element__image-moscow.jpg'
  },
  {
    name: 'Амман',
    link: './images/element__image-amman.jpg'
  },
  {
    name: 'Вади Рам',
    link: './images/element__image-wadirum.jpg'
  },
  {
    name: 'Дамаск',
    link: './images/element__image-damascus.jpg'
  }
];

//Initial cards render
let elementsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

initialCards.forEach(makePlaceCard);

//Function that makes place cards
function makePlaceCard (item) {
  let placeCard = elementTemplate.cloneNode(true);

  placeCard.querySelector('.element__image').src = item.link;
  placeCard.querySelector('.element__place-name').textContent = item.name;

  elementsContainer.prepend(placeCard);
}

//Cards deleting function
function deleteCard() {
  document.querySelectorAll('.element__trash-button').forEach(function(button) {
    button.addEventListener('click', function() {
      this.parentElement.remove();
    });
  });
}


//Photo opening
let popupImage = document.querySelector('.popup_image');
let popupImageView = document.querySelector('.popup__image');
let popupImageCaption = document.querySelector('.popup__image-caption');
let popupImageCloseButton = document.querySelector('.popup__close-icon_image');


function imageViewport() {
  document.querySelectorAll('.element__image').forEach(function (image) {
    image.addEventListener ('click', function showImagePopup() {
      popupImageView.src = this.src;
      let element = this.parentElement;
      let placeName = element.querySelector('.element__place-name');
      console.log(placeName.textContent);
      popupImageCaption.textContent = placeName.textContent;
      console.log(popupImageCaption.textContent);
      popupImage.classList.add('popup_opened');
    });
  });
}

function closeImagePopup() {
  popupImage.classList.remove('popup_opened');
}

popupImageCloseButton.addEventListener('click', closeImagePopup);

//Initializing
imageViewport();

//Initializing likes
like();

//Initializing deleting card function
deleteCard();
