export default class Card {
  constructor({data, myId, handleCardClick, handleLikeClick, handleDeleteIconClick}, template) {
    this._template = template;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  /* Generating card */
  generateCard(data) {
    this._element = this._getTemplate();

    this._data = data;
    this._dataName = data.name;
    this._dataLink = data.link;
    /*console.log(`generateCard : ${this._dataLink}`);*/
    this._dataLikes = data.likes;
    this._dataOwnerId = data.owner._id;

    this._elementName = this._element.querySelector('.element__place-name');
    this._image = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeCounter = this._element.querySelector('.element__like-counter');
    this._trashButton = this._element.querySelector('.element__trash-button');
    this._image.src = this._dataLink;
    this._image.alt = `На фотографии — ${this._dataName}`;
    this._elementName.textContent = this._dataName;
    if (!this._trashCheck()) {
      this._trashHide(this._trashButton);
    }
    if (this._likeCheck()) {
      this._likeAdd(this._likeButton);
    }
    this._likeCounter.textContent = this._dataLikes.length;
    this._setEventListeners(this._likeButton);

    return this._element;
  }

  /* Getting template of card */
  _getTemplate() {
    return document
      .querySelector(this._template)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  /* Setting element listeners */
  _setEventListeners(likeButton) {
    this._like(likeButton);
    this._popupViewer();
    this._cardDelete();
  }

  /* Handling click on like button */
  _like(likeButton) {
    likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._data, this._element, this._likeAdd, this._likeRemove, likeButton);
    });
  }

/* --- L I K E C H E C K E R --- */
  _likeCheck() {
    return this._dataLikes.some(likeObj => {
      return likeObj._id === this._myId;
    });
  }

  _likeAdd(likeButton) {
    likeButton.classList.add('element__like-button_active');
  }

  _likeRemove(likeButton) {
    likeButton.classList.remove('element__like-button_active');
  }
/* --- E N D - O F - L I K E C H E C K E R --- */


  _trashCheck = () => {
    return this._dataOwnerId === this._myId;
    /*return this._data.owner._id === this._myId;*/
  }

  _trashHide = (trashButton) => {
    trashButton.remove();
  }


  _cardDelete = () => {
    if (this._element.querySelector('.element__trash-button')) {
      this._element.querySelector('.element__trash-button').
      addEventListener('click', () => {
        this._handleDeleteIconClick({
          dataId: this._data._id,
          element: this._element
        });
      });
    }
  }

  _showImage = () => {
    /*console.log(`_popupViewer this._showImage : ${this._dataLink}`);*/
    this._handleCardClick(this._dataLink, this._dataName);
  }

  _popupViewer = () => {
    /*console.log(`_popupViewer this._dataLink : ${this._dataLink}`);*/
    this._image.addEventListener('click', this._showImage);
  }
}




/*const createCard = (data) => {
  const card = new Card(data, api, userId, '.card__template', (data) => {handleCardClick(data)}, (data) => {
    const submitPopup = new PopupWithSubmit('.popup_type_submit', (data) => {
      api
          .deleteCard(data._id)
          .then(() => {
            card.removeCard();
          })
          .catch((err) => {console.log(err)});
    });
    submitPopup.setEventListeners();
    submitPopup.openPopup(data)
  });
  const cardElement = card.generateCard();
  return cardElement;
};*/
