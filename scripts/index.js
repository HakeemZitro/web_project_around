// -------- DATOS INICIALES Y PLANTILLAS -------- //
const initialCards = [
  { name: "Welcome to Fabulous Las Vegas", link: "./images/Welcome_Las_Vegas.avif" },
  { name: "Seattle Space Needle", link: "./images/Space_Needle.avif" },
  { name: "Chicago Cloud Gate", link: "./images/Cloud_Gate.avif" },
  { name: "Santa Monica Pier", link: "./images/Santa_Monica_Pier.avif" },
  { name: "SF Golden Gate", link: "./images/Golden_Gate.avif" },
  { name: "NY Central Park", link: "./images/Central_Park.avif" }
];
const postsContainer = document.querySelector(".elements");
const postTemplate = document.querySelector("#element-template").content;


// -------- FUNCION PARA CREAR POST DESDE OBJETO { name, link } -------- //
function createPost({ name, link }) {
  const postElement = postTemplate.querySelector(".element").cloneNode(true);
  const image = postElement.querySelector(".element__image");
  const title = postElement.querySelector(".element__name");

  title.textContent = name;
  image.src = link;
  image.alt = `Fotografía de ${name}`;

  return postElement;
}

// -------- CARGA POSTS INICIALES -------- //
initialCards.forEach((card) => {
  const post = createPost(card);
  postsContainer.append(post);
});

// -------- DELEGACIÓN DE EVENTOS EN EL CONTENEDOR DE POSTS -------- //
postsContainer.addEventListener("click", (evt) => {
  const fullImagePhoto = popupFullImage.querySelector(".popup__image");
  const fullImageTitle = popupFullImage.querySelector(".popup__image-title");

  // Like
  if (evt.target.classList.contains("element__like")) {
    evt.target.classList.toggle("element__like_active");
  }

  // Delete
  if (evt.target.classList.contains("element__trash")) {
    evt.target.closest(".element").remove();
  }

  // Full-Image
  if (evt.target.classList.contains("element__image")) {
    fullImagePhoto.src = evt.target.src;
    fullImagePhoto.alt = evt.target.alt;
    fullImageTitle.textContent = evt.target.alt.replace("Fotografía de ", "");
    openPopup(popupFullImage);
  }
});


// -------- DATOS DE POPUPS -------- //
const popupAddPost = document.querySelector("#popup-add-post");
const popupEditInfo = document.querySelector("#popup-edit-info");
const popupFullImage = document.querySelector("#popup-full-image");

const openAddPost = document.querySelector(".profile__add-button");
const openEditInfo = document.querySelector(".profile__edit-button");
const openPopupButtons = [openAddPost, openEditInfo];

// -------- FUNCION PARA ABRIR POPUPS -------- //
function openPopup(popupElement, nameInput, descriptionInput) {
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  popupElement.classList.add("popup_open");

  if (popupElement === popupEditInfo) {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  }

  if (popupElement === popupAddPost) {
    nameInput.value = "";
    descriptionInput.value = "";
  }

  if (popupElement.classList.contains(".validated") || popupElement === popupFullImage) {return;}
  popupElement.classList.add("validated");
  setEventListeners(popupElement, config);
}

// -------- FUNCION PARA ENVIAR FORMULARIO (Editar Perfil / Agregar Post) -------- //
function sendPopup(popupElement, nameInput, descriptionInput) {
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  if (popupElement === popupEditInfo) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
  }

  if (popupElement === popupAddPost) {
    const newPost = createPost({ name: nameInput.value, link: descriptionInput.value });
    postsContainer.prepend(newPost);
  }

  closePopup(popupElement);
}

// -------- FUNCION PARA CERRAR POPUPS -------- //
function closePopup(popupElement) {
  popupElement.classList.remove("popup_open");
  resetValidation(popupElement, config);
}

// -------- ASIGNACION DE EVENTOS PARA ABRIR POPUPS CON BOTONES DE PERFIL -------- //
openPopupButtons.forEach((buttonElement) => {
  buttonElement.addEventListener("click", () => {
    if(buttonElement === openAddPost) {
      const nameInput = popupAddPost.querySelector(".popup__input_type_name");
      const descriptionInput = popupAddPost.querySelector(".popup__input_type_description");
      openPopup(popupAddPost, nameInput, descriptionInput);
    }

    if(buttonElement === openEditInfo) {
      const nameInput = popupEditInfo.querySelector(".popup__input_type_name");
      const descriptionInput = popupEditInfo.querySelector(".popup__input_type_description");
      openPopup(popupEditInfo, nameInput, descriptionInput);
    }
  });
});

// -------- ASIGNACION DE EVENTOS PARA CERRAR POPUPS CON BOTON "X" -------- //
const closePopupButtons = Array.from(document.querySelectorAll(".popup__close-button"));
closePopupButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => closePopup(closeButton.closest(".popup")));
});

// -------- ASIGNACION DE EVENTOS PARA CERRAR POPUPS CON "CLICK" FUERA DE LA IMAGEN -------- //
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// -------- ASIGNACION DE EVENTOS PARA CERRAR POPUPS CON TECLA "ESCAPE" -------- //
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup.popup_open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
});

