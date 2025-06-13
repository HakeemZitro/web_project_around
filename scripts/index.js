// -------- CARGANDO POSTS INICIALES -------- //
const initialCards = [
  {name: "Welcome to Fabulous Las Vegas", link: "./images/Welcome_Las_Vegas.avif"},
  {name: "Seattle Space Needle", link: "./images/Space_Needle.avif"},
  {name: "Chicago Cloud Gate", link: "./images/Cloud_Gate.avif"},
  {name: "Santa Monica Pier", link: "./images/Santa_Monica_Pier.avif"},
  {name: "SF Golden Gate", link: "./images/Golden_Gate.avif"},
  {name: "NY Central Park", link: "./images/Central_Park.avif"}];
const postsContainer = document.querySelector(".elements");
const postTemplate = document.querySelector("#element-template").content;


// --- AGREGA POST UNO A UNO DESDE ARRAY INICIAL --- //
initialCards.forEach(function (post) {
  const postElement = postTemplate.querySelector(".element").cloneNode(true);
  postElement.querySelector(".element__name").textContent = post.name;
  postElement.querySelector(".element__image").src = post.link;
  postElement.querySelector(".element__image").alt = `Fotografía de ${post.name}`;

  postsContainer.append(postElement);
});



// -------- VENTANAS EMERGENTES Y ENVIO DE FORMULARIOS (INFO PERFIL / AGREGAR POST) -------- //
const addPostOpen = document.querySelector(".profile__add-button");
const popupAddPost = document.querySelector("#popup-add-post");
const addPostForm = popupAddPost.querySelector(".popup__container")
const addPostClose = popupAddPost.querySelector(".popup__close-button");
const addPostTitleInput = popupAddPost.querySelector(".popup__input_type_name");
const addPostLinkInput = popupAddPost.querySelector(".popup__input_type_description");
const addPostSave = popupAddPost.querySelector(".popup__submit-button");

const editInfoOpen = document.querySelector(".profile__edit-button");
const popupEditInfo = document.querySelector("#popup-edit-info");
const editInfoForm = popupEditInfo.querySelector(".popup__container")
const editInfoClose = popupEditInfo.querySelector(".popup__close-button");
const editInfoNameInput = popupEditInfo.querySelector(".popup__input_type_name");
const editInfoDescriptionInput = popupEditInfo.querySelector(".popup__input_type_description");
const editInfoSave = popupEditInfo.querySelector(".popup__submit-button");


// --- ABRE VENTANA EMERGENTE --- //
function openPopup(popup, name, description, sendButton) {
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  popup.classList.add("popup_open");

  if(popup === popupEditInfo) {
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
  }

  if(popup === popupAddPost) {
    name.value = "";
    description.value = "";
  }

  renderPopup(name, description, sendButton);
}


// --- REVISA CONTENIDO DE VENTANA EMERGENTE Y ACTIVA/DESACTIVA BOTON DE ENVIO --- //
function renderPopup(name, description, sendButton) {
  if ((name.value === "") || (description.value === "")) {
    sendButton.classList.add("popup__submit-button_disabled"); //Cambiar las variables por argumentos
    sendButton.disabled = true;
  }
  else {
    sendButton.classList.remove("popup__submit-button_disabled");
    sendButton.disabled = false;
  }
}


// --- ACTUALIZA INFO PERFIL / AGREGA POST NUEVO --- //
function sendPopup(evt, popup, name, description) {
  evt.preventDefault();
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");
  const postElement = postTemplate.querySelector(".element").cloneNode(true);


  if(popup === popupEditInfo) {
    profileName.textContent = name.value;
    profileDescription.textContent = description.value;
  }

  if(popup === popupAddPost) {
    postElement.querySelector(".element__name").textContent = name.value;
    postElement.querySelector(".element__image").src = description.value;
    postElement.querySelector(".element__image").alt = `Fotografía de ${name.value}`;
    postsContainer.prepend(postElement);
  }

    closeInfo(popup);
}


// --- CIERRA VENTANA EMERGENTE --- //
function closeInfo(popup) {
  popup.classList.remove("popup_open");
}



// -------- DECLARACION DE EVENTOS -------- //
// --- EVENTOS EDITAR INFO --- //
editInfoOpen.addEventListener("click", () => openPopup(popupEditInfo, editInfoNameInput, editInfoDescriptionInput, editInfoSave));
editInfoNameInput.addEventListener("input", () => renderPopup(editInfoNameInput, editInfoDescriptionInput, editInfoSave));
editInfoDescriptionInput.addEventListener("input", () => renderPopup(editInfoNameInput, editInfoDescriptionInput, editInfoSave));
editInfoClose.addEventListener("click", () => closeInfo(popupEditInfo));
editInfoForm.addEventListener("submit", (evt) => sendPopup(evt, popupEditInfo, editInfoNameInput, editInfoDescriptionInput));

// --- EVENTOS AGREGAR POST --- //
addPostOpen.addEventListener("click", () => openPopup(popupAddPost, addPostTitleInput, addPostLinkInput, addPostSave));
addPostTitleInput.addEventListener("input", () => renderPopup(addPostTitleInput, addPostLinkInput, addPostSave));
addPostLinkInput.addEventListener("input", () => renderPopup(addPostTitleInput, addPostLinkInput, addPostSave));
addPostClose.addEventListener("click", () => closeInfo(popupAddPost));
addPostForm.addEventListener("submit", (evt) => sendPopup(evt, popupAddPost, addPostTitleInput, addPostLinkInput));















/*

// --- ABRE VENTANA EMERGENTE --- //
addPostOpen.addEventListener("click", function () {
  popupAddPost.classList.add("popup_open");
});

// --- RENDER DE INPUTS PARA BOTON CARGAR --- //



// --- CIERRA VENTANA EMERGENTE --- //
addPostClose.addEventListener("click", function () {
  popupAddPost.classList.remove("popup_open");
});














// EDITANDO INFORMACIÓN DE PERFIL
const editInfoButton = document.querySelector(".profile__edit-button");
const likeButton = document.querySelectorAll(".element__like-icon");
const popupEditInfo = document.querySelector("#popup-edit-info");
const popupSaveButton = document.querySelector(".popup__submit-button");
const popupCloseButton = document.querySelector(".popup__close-button"); //Actualizar las variables a nombres similares a popupAddPost y los querys selector a su elemento popupEditinfo
const profileForm = document.querySelector(".popup__container")
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const inputName = popupEditInfo.querySelector(".popup__input_type_name");
const inputDescription = popupEditInfo.querySelector(".popup__input_type_description");


function openPopup(popup, name, description) {
  popup.classList.add("popup_open");

  if(popup == popupEditInfo) {
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
  }

  renderInfo();
}

function renderInfo() {
  if ((inputName.value == "") || (inputDescription.value == "")) {
    popupSaveButton.classList.add("popup__submit-button_disabled"); //Cambiar las variables por argumentos
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
  profileDescription.textContent = inputDescription.value; //Crear sentencias if para cuando es popupEditInfo y popupAddPost
  closeInfo();
}

function closeInfo(popup) {
  popup.classList.remove("popup_open");
}


editInfoButton.addEventListener("click", () => openPopup(popupEditInfo, inputName, inputDescription));
addPostOpen.addEventListener("click", () => openPopup(popupAddPost));
popupCloseButton.addEventListener("click", () => closeInfo(popupEditInfo));
addPostClose.addEventListener("click", () => closeInfo(popupAddPost));

inputName.addEventListener("input", renderInfo);
inputDescription.addEventListener("input", renderInfo); //Actualizar las funciones
profileForm.addEventListener("submit", saveInfo);

*/