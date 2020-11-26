// Включаем возможность открывать и закрывать окно редактирования профиля

let profileEditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.popup_opened');
let popupCloseIcon = document.querySelector('.popup__close-icon');
let popupSubmitButton = document.querySelector('.popup__submit-button');

let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let popupName = document.querySelector('.popup__name');
let popupCaption = document.querySelector('.popup__caption');

function ShowPopup() {
	popup.classList.add('popup_opened');
	popupName.setAttribute('value', profileName.textContent);
	popupCaption.setAttribute('value', profileCaption.textContent);
}

function ClosePopup() {
	popup.classList.remove('popup_opened');
}

function SetNewProfileInfo() {
	profileName.textContent = document.querySelector('.popup__name').value;
	profileCaption.textContent = document.querySelector('.popup__caption').value;
	ClosePopup();
}

profileEditButton.addEventListener('click', ShowPopup);
popupCloseIcon.addEventListener('click', ClosePopup);
popupSubmitButton.addEventListener('click', SetNewProfileInfo);