const editInfoButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const likeButton = document.querySelectorAll(".element__like-icon");
const popupWindow = document.querySelector(".popup");
const popupSaveButton = document.querySelector(".popup__submit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const profileForm = document.querySelector(".popup__container")
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");


function openInfo() {
  popupWindow.classList.add("popup_open");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  renderInfo();
}

function renderInfo() {
  if ((inputName.value == "") || (inputDescription.value == "")) {
    popupSaveButton.classList.add("popup__submit-button_disabled");
    popupSaveButton.disabled = true;
  }
  else {
    popupSaveButton.classList.remove("popup__submit-button_disabled");
    popupSaveButton.disabled = false;
  }
}

function saveInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeInfo();
}

function closeInfo() {
  popupWindow.classList.remove("popup_open");
}


inputName.addEventListener("input", renderInfo);
inputDescription.addEventListener("input", renderInfo);
editInfoButton.addEventListener("click", openInfo);
profileForm.addEventListener("submit", saveInfo);
popupCloseButton.addEventListener("click", closeInfo);