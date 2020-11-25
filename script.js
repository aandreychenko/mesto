// Включаем возможность открывать и закрывать окно редактирования профиля

let profileEditButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.edit-form');
let editFormCloseIcon = document.querySelector('.edit-form__close-icon');
let editFormSubmitButton = document.querySelector('.edit-form__submit-button');

let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let editFormName = document.querySelector('.edit-form__name');
let editFormCaption = document.querySelector('.edit-form__caption');

function ShowEditForm() {
	editForm.setAttribute('style', 'display: block');
	editFormName.setAttribute('value', profileName.textContent);
	editFormCaption.setAttribute('value', profileCaption.textContent);
}

function CloseEditForm() {
	editForm.setAttribute('style', 'display: none');
}

function SetNewProfileInfo() {
	profileName.textContent = document.querySelector('.edit-form__name').value;
	profileCaption.textContent = document.querySelector('.edit-form__caption').value;
	CloseEditForm();
}

profileEditButton.addEventListener('click', ShowEditForm);
editFormCloseIcon.addEventListener('click', CloseEditForm);
editFormSubmitButton.addEventListener('click', SetNewProfileInfo);