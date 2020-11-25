//Включаем возможность открывать и закрывать окно редактирования профиля

let profileEditButton = document.querySelector('.profile__edit-button');
let editForm = document.querySelector('.edit-form');
let editFormCloseIcon = document.querySelector('.edit-form__close-icon');

function ShowEditForm() {
	editForm.setAttribute('style', 'display: block');
}

function HideEditForm() {
	editForm.setAttribute('style', 'display: none');
}

profileEditButton.addEventListener('click', ShowEditForm);
editFormCloseIcon.addEventListener('click', HideEditForm);