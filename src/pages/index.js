/* ---------- I M P O R T ---------- */
import './index.css';
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import FormValidator from '../components/FormValidator.js';
import { validationConfig, profileConfig } from '../vendor/constants.js';
import Section from "../components/Section.js";
import Card from '../components/Card.js';
import renderLoading from "../vendor/utils.js";

/* ---------- I N T E R F A C E - E L E M E N T S ---------- */
/* profile */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileForm = document.querySelector('.popup__container_profile-edit');
const popupProfileEditName = document.querySelector('.popup__name_profile-edit');
const popupProfileEditCaption = document.querySelector('.popup__caption_profile-edit');

/* avatar */
const avatarForm = document.querySelector('.popup__container_user-image');
const popupAvatar = document.querySelector('.profile__avatar-container');
const popupAvatarLink = document.querySelector('.popup__caption_user-image');

/* cards */
const popupPlaceAddName = document.querySelector('.popup__name_add-place');
const popupPlaceAddCaption = document.querySelector('.popup__caption_add-place');
const addPlaceButton = document.querySelector('.profile__add-button');
const cardsForm = document.querySelector('.popup__container_add-place');

let myId = null;

/* ---------- U S E R - P R O F I L E ---------- */
/* Making new Api class object for requesting information from server */
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1',
  groupId: 'cohort-20',
  headers: {
    authorization: '9af7eabd-c94e-4285-ad12-d82268efba7b',
    'Content-Type': 'application/json'
  }
});

/* Making new UserInfo class object for operating user information  */
const userInfo = new UserInfo({
  nameElementSelector: profileConfig.profileName,
  captionElementSelector: profileConfig.profileAbout,
  userImage: profileConfig.profileImage
});

/* Getting user text information */
api.getUserInfo()
    .then(result => {
      myId = result._id;
      userInfo.setUserInfo(result);
      userInfo.updateUserInfo();
    });

/* New object of PopupWithForm class */
const profileEditPopup = new PopupWithForm({
  popupSelector: '.popup_profile-edit'});

/* Settings for user information updating  */
profileEditPopup.setEventListeners((data) => {
  renderLoading(true);
  api.changeUserInfo(data)
      .then((result) => {
        userInfo.setUserInfo(result);
        userInfo.updateUserInfo();
      })
      .finally(() => {
        renderLoading();
        profileEditPopup.close();
      })
});

/* Setting listener for profile edit button */
profileEditButton.addEventListener('click', () => {
  profileValidation.resetValidation();
  const getUserInfo = userInfo.getUserInfo();
  popupProfileEditName.value = getUserInfo.name;
  popupProfileEditCaption.value = getUserInfo.about;
  profileEditPopup.open();
});

/* Setting form validation of user profile popup */
const profileValidation = new FormValidator(profileForm, validationConfig);
profileValidation.enableValidation();


/* ---------- avatar ---------- */

const avatarUpdPopup = new PopupWithForm({
  popupSelector: '.popup_user-image'});

avatarUpdPopup.setEventListeners((data) => {
  renderLoading(true);
  api.changeUserImage(data)
      .then(result => {
        userInfo.setUserInfo(result);
        userInfo.updateUserInfo();
      })
      .finally(() => {
        renderLoading();
        avatarUpdPopup.close();
      })
});

const avatarValidation = new FormValidator(avatarForm, validationConfig);
avatarValidation.enableValidation();

popupAvatar.addEventListener('click', () => {
  popupAvatarLink.value = '';
  avatarValidation.resetValidation();
  avatarUpdPopup.open();
});

/* ------- E N D - O F - U S E R - P R O F I L E ------- */


/* ---------- C A R D S ---------- */
/* Initializing Section class for cards inserting */
const cardList = new Section(
    (data) => {
      const cardElement = createCard(data);
      cardList.addItem(cardElement, false);
    },
    '.elements'
);

/* Getting cards from server */
api.getCards()
    .then((res) => {
      cardList.renderItems(res);
    })
    .catch((err) => console.log(err))

/* Initializing Card class for cards producing */
function createCard(data) {
  const card = new Card({data, myId, handleCardClick, handleLikeClick, handleDeleteIconClick}, '#element');
  return card.generateCard(data);
}

/* Setting listener of adding place button */
addPlaceButton.addEventListener('click', () => {
  popupPlaceAddName.value = '';
  popupPlaceAddCaption.value = '';
  cardsValidation.resetValidation();
  cardAddPopup.open();
});

/* Initializing PopupWithForm class for place adding popup */
const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_add-place'});

/* Turning validation in adding place popup on */
const cardsValidation = new FormValidator(cardsForm, validationConfig);
cardsValidation.enableValidation();

/* Setting listener of card submit button in popup */
cardAddPopup.setEventListeners((data) => {
  renderLoading(true);
      api.postCard(data)
          .then((result) => {
            const cardElement = createCard(result);
            cardList.addItem(cardElement, true);
          })
          .finally(() => {
            renderLoading();
            cardAddPopup.close();
          })
});


/* ---------- zoom photo ---------- */
/* Initializing popup for image viewing */
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

/* Function that opening image popup */
function handleCardClick(image, caption) {
  popupImage.open(image, caption);
}


/* ---------- like ---------- */
function setLikeCounter(element, likeAmount) {
  element.querySelector('.element__like-counter').textContent = likeAmount;
}

function handleLikeClick(data, element, likeAdd, likeRemove, likeButton) {
  if (!likeButton.classList.contains('element__like-button_active')) {
    api.putLike(data)
      .then(res => {
        likeAdd(likeButton);
        setLikeCounter(element, res.likes.length);
      })
      .catch(err => console.log(err));
  } else if (likeButton.classList.contains('element__like-button_active')) {
    api.deleteLike(data)
      .then(res => {
        likeRemove(likeButton);
        setLikeCounter(element, res.likes.length);
      })

      .catch(err => console.log(err));
  }
}

/* ---------- delete ---------- */
const submitPopup = new PopupWithSubmit({popupSelector: '.popup_card-delete'});

submitPopup.setEventListeners();

function handleDeleteIconClick({dataId, element}) {
  submitPopup.open();
  submitPopup.setSubmitCallback(() => {
    api.deleteCard(dataId)
      .then(res => {
        removeCard(element);
        submitPopup.close();
      })
      .catch(err => console.log(err));
  });
}

function removeCard(element) {
  element.remove();
}
