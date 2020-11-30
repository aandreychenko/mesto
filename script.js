// Включаем возможность открывать и закрывать окно редактирования профиля

let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');
let popupContainer = document.querySelector('.popup__container');

let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let popupName = document.querySelector('.popup__name');
let popupCaption = document.querySelector('.popup__caption');

function showPopup() {
	popupName.value = profileName.textContent;
	popupCaption.value = profileCaption.textContent;
	popup.classList.add('popup_opened');
}

function closePopup() {
	popup.classList.remove('popup_opened');
}

function setNewProfileInfo() {
	event.preventDefault();
	profileName.textContent = popupName.value;
	profileCaption.textContent = popupCaption.value;
	closePopup();
}

function like() {
	document.querySelectorAll('.element__like-button')
	.forEach(function(button) {
	  button.addEventListener('click', function() {
	  	this.classList.toggle('element__like-button_active')
	  });
	});
};

profileEditButton.addEventListener('click', showPopup);
popupCloseIcon.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', setNewProfileInfo);

like();