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


// -------- FUNCIONES -------- //

// Crea post desde objeto { name, link }
function createPost({ name, link }) {
  const postElement = postTemplate.querySelector(".element").cloneNode(true);
  const image = postElement.querySelector(".element__image");
  const title = postElement.querySelector(".element__name");

  title.textContent = name;
  image.src = link;
  image.alt = `Fotografía de ${name}`;

  return postElement;
}

// Abre ventana emergente y limpia/rellena inputs si aplica
function openPopup(popup, name, description, sendButton) {
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  popup.classList.add("popup_open");

  if (popup === popupEditInfo) {
    name.value = profileName.textContent;
    description.value = profileDescription.textContent;
  }

  if (popup === popupAddPost) {
    name.value = "";
    description.value = "";
  }

  if (popup !== popupFullImage) {
    renderPopup(name, description, sendButton);
  }
}

// Activa/desactiva botón de envío en popup
function renderPopup(name, description, sendButton) {
  const empty = name.value.trim() === "" || description.value.trim() === "";

  sendButton.disabled = empty;
  sendButton.classList.toggle("popup__button_disabled", empty);
}

// Enviar formulario: editar perfil o agregar post
function sendPopup(evt, popup, name, description) {
  evt.preventDefault();
  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  if (popup === popupEditInfo) {
    profileName.textContent = name.value;
    profileDescription.textContent = description.value;
  }

  if (popup === popupAddPost) {
    const newPost = createPost({ name: name.value, link: description.value });
    postsContainer.prepend(newPost);
  }

  closePopup(popup);
}

// Cerrar popup
function closePopup(popup) {
  popup.classList.remove("popup_open");
}

// Configuración de eventos para formularios mediante objeto { openBtn, closeBtn, popup, form, nameInput, descInput, sendBtn }
function setupPopupEvents({ openBtn, closeBtn, popup, form, nameInput, descInput, sendBtn }) {
  openBtn.addEventListener("click", () => openPopup(popup, nameInput, descInput, sendBtn));
  closeBtn.addEventListener("click", () => closePopup(popup));
  nameInput.addEventListener("input", () => renderPopup(nameInput, descInput, sendBtn));
  descInput.addEventListener("input", () => renderPopup(nameInput, descInput, sendBtn));
  form.addEventListener("submit", (evt) => sendPopup(evt, popup, nameInput, descInput));
}


// -------- VENTANAS EMERGENTES -------- //
const popupAddPost = document.querySelector("#popup-add-post");
const popupEditInfo = document.querySelector("#popup-edit-info");
const popupFullImage = document.querySelector("#popup-full-image");

const fullImagePhoto = popupFullImage.querySelector(".popup__image");
const fullImageTitle = popupFullImage.querySelector(".popup__image-title");
const fullImageClose = popupFullImage.querySelector(".popup__close-button");


// -------- ELEMENTOS FORMULARIO -------- //
setupPopupEvents({
  openBtn: document.querySelector(".profile__edit-button"),
  closeBtn: popupEditInfo.querySelector(".popup__close-button"),
  popup: popupEditInfo,
  form: popupEditInfo.querySelector(".popup__form"),
  nameInput: popupEditInfo.querySelector(".popup__input_type_name"),
  descInput: popupEditInfo.querySelector(".popup__input_type_description"),
  sendBtn: popupEditInfo.querySelector(".popup__button")
});

setupPopupEvents({
  openBtn: document.querySelector(".profile__add-button"),
  closeBtn: popupAddPost.querySelector(".popup__close-button"),
  popup: popupAddPost,
  form: popupAddPost.querySelector(".popup__form"),
  nameInput: popupAddPost.querySelector(".popup__input_type_name"),
  descInput: popupAddPost.querySelector(".popup__input_type_description"),
  sendBtn: popupAddPost.querySelector(".popup__button")
});

fullImageClose.addEventListener("click", () => closePopup(popupFullImage));


// -------- CARGAR POSTS INICIALES -------- //
initialCards.forEach((card) => {
  const post = createPost(card);
  postsContainer.append(post);
});


// -------- DELEGACIÓN DE EVENTOS EN POSTS -------- //
postsContainer.addEventListener("click", (evt) => {
  const target = evt.target;

  // LIKE
  if (target.classList.contains("element__like")) {
    target.classList.toggle("element__like_active");
  }

  // DELETE
  if (target.classList.contains("element__trash")) {
    target.closest(".element").remove();
  }

  // FULL IMAGE
  if (target.classList.contains("element__image")) {
    fullImagePhoto.src = target.src;
    fullImagePhoto.alt = target.alt;
    fullImageTitle.textContent = target.alt.replace("Fotografía de ", "");
    openPopup(popupFullImage);
  }
});