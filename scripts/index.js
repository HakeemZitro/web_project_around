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

  // FULL IMAGE POSTS AGREGADOS //
  postElement.querySelector(".element__image").addEventListener("click", () => {
    fullImagePhoto.src = post.link;
    fullImagePhoto.alt = `Fotografía de ${post.name}`;
    fullImageTitle.textContent = post.name;

    openPopup(popupFullImage);
  })

  // LIKE PARA POSTS INICIALES //
  postElement.querySelector(".element__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active");
  });

  // ELIMINA POSTS INICIALES //
  postElement.querySelector(".element__trash").addEventListener("click", () => {
    postElement.remove();
  });

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

const popupFullImage = document.querySelector("#popup-full-image");
const fullImageContainer = popupFullImage.querySelector(".popup__image-container");
const fullImagePhoto = popupFullImage.querySelector(".popup__image");
const fullImageTitle = popupFullImage.querySelector(".popup__image-title");
const fullImageClose = popupFullImage.querySelector(".popup__close-button");


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

  if(popup === popupFullImage) {
    return;
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
    postElement.name = name.value;
    postElement.link = description.value;
    initialCards.unshift(postElement)

    postElement.querySelector(".element__name").textContent = name.value;
    postElement.querySelector(".element__image").src = description.value;
    postElement.querySelector(".element__image").alt = `Fotografía de ${name.value}`;

    // FULL IMAGE POSTS AGREGADOS //
    postElement.querySelector(".element__image").addEventListener("click", () => {
      fullImagePhoto.src = description.value;
      fullImagePhoto.alt = `Fotografía de ${name.value}`;
      fullImageTitle.textContent = name.value;

      openPopup(popupFullImage);
    })

    // LIKE PARA POSTS AGREGADOS //
    postElement.querySelector(".element__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("element__like_active");
    });

    // ELIMINA POSTS AGREGADOS //
    postElement.querySelector(".element__trash").addEventListener("click", () => {
      postElement.remove();
    });

    postsContainer.prepend(postElement);
  }

  closePopup(popup);
}


// --- CIERRA VENTANA EMERGENTE --- //
function closePopup(popup) {
  popup.classList.remove("popup_open");
}



// -------- DECLARACION DE EVENTOS -------- //
// --- EVENTOS EDITAR INFO --- //
editInfoOpen.addEventListener("click", () => openPopup(popupEditInfo, editInfoNameInput, editInfoDescriptionInput, editInfoSave));
editInfoNameInput.addEventListener("input", () => renderPopup(editInfoNameInput, editInfoDescriptionInput, editInfoSave));
editInfoDescriptionInput.addEventListener("input", () => renderPopup(editInfoNameInput, editInfoDescriptionInput, editInfoSave));
editInfoClose.addEventListener("click", () => closePopup(popupEditInfo));
editInfoForm.addEventListener("submit", (evt) => sendPopup(evt, popupEditInfo, editInfoNameInput, editInfoDescriptionInput));

// --- EVENTOS AGREGAR POST --- //
addPostOpen.addEventListener("click", () => openPopup(popupAddPost, addPostTitleInput, addPostLinkInput, addPostSave));
addPostTitleInput.addEventListener("input", () => renderPopup(addPostTitleInput, addPostLinkInput, addPostSave));
addPostLinkInput.addEventListener("input", () => renderPopup(addPostTitleInput, addPostLinkInput, addPostSave));
addPostClose.addEventListener("click", () => closePopup(popupAddPost));
addPostForm.addEventListener("submit", (evt) => sendPopup(evt, popupAddPost, addPostTitleInput, addPostLinkInput));

// --- EVENTOS FULL IMAGE --- //
fullImageClose.addEventListener("click", () => closePopup(popupFullImage));