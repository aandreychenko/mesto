import './index.css';
import Card from '../components/Card.js';
import { validationConfig, constants } from '../vendor/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";


//interface elements
const profileEditButton = document.querySelector('.profile__edit-button');
const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const profileName = document.querySelector('.profile__name');
const profileCaption = document.querySelector('.profile__caption');
const popupProfileEditName = document.querySelector('.popup__name_profile-edit');
const popupProfileEditCaption = document.querySelector('.popup__caption_profile-edit');
const popupPlaceAddName = document.querySelector('.popup__name_add-place');
const popupPlaceAddCaption = document.querySelector('.popup__caption_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('.popup__container_profile-edit');
const cardsForm = document.querySelector('.popup__container_add-place');


/*Setting userInfo*/
const userInfo = new UserInfo({
  name: profileNameSelector,
  caption: profileCaptionSelector
});
/*console.log(profileNameSelector, profileCaptionSelector);
console.log(profileName.textContent, profileCaption.textContent);*/
userInfo.setUserInfo(profileName.textContent, profileCaption.textContent);


/*Creating cards function*/
function createCard(data) {
  const card = new Card({data, handleCardClick}, '#element');
  const cardElement = card.generateCard();
  return cardElement;
}

/*Initialize popup for card making*/
const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_add-place',
  handleFormSubmit: (data) => {
    const card = createCard(data);
    insertCard(card);
    cardAddPopup.close();
  }
});

cardAddPopup.setEventListeners();


/*Initialize popup for user information changing*/
const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data.name, data.caption);
    profileEditPopup.close();
  }
});

profileEditPopup.setEventListeners();


/*Initializing card inserting class*/
const cardList = new Section({
      items: constants,
      renderer: (data) => {
        const card = createCard(data);

        insertCard(card);
      }
    },
    '.elements'
);

/*Inserting card into container*/
function insertCard (data) {
  cardList.addItem(data);
}

cardList.renderItems();


/*Form validation*/
const profileValidation = new FormValidator(profileForm, validationConfig);
profileValidation.enableValidation();

const cardsValidation = new FormValidator(cardsForm, validationConfig);
cardsValidation.enableValidation();


/*Initializing popup for image viewing*/
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();


/*Function that opening image popup*/
function handleCardClick(image, caption) {
  popupImage.open(image, caption);
}


/*Listener of profile edit button*/
profileEditButton.addEventListener('click', () => {
  profileValidation.resetValidation();
  const getUserInfo = userInfo.getUserInfo();
  popupProfileEditName.value = getUserInfo.name;
  popupProfileEditCaption.value = getUserInfo.caption;
  profileEditPopup.open();
});


/*Listener of adding place button*/
addPlaceButton.addEventListener('click', () => {
  /*popupPlaceAddName.value = '';
  popupPlaceAddCaption.value = '';*/
  cardsValidation.resetValidation();
  cardAddPopup.open();
});
