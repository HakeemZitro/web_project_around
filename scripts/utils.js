// ----- Importaciones ----- //
import { Card } from "./Card.js";
import { formValidationInstances, postsContainer } from "./index.js";


// ----- Datos de popups ----- //
const popupAddPost = document.querySelector("#popup-add-post");
const popupEditInfo = document.querySelector("#popup-edit-info");
const popupFullImage = document.querySelector("#popup-full-image");
const popupForms = [popupAddPost, popupEditInfo];

const openAddPost = document.querySelector(".profile__add-button");
const openEditInfo = document.querySelector(".profile__edit-button");
const openPopupButtons = [openAddPost, openEditInfo];


// ----- Funcion para abrir popups ----- //
const openPopup = (popupElement) => {
  popupElement.classList.add("popup_open");

  if (popupElement === popupFullImage) {return;}

  if (popupElement === popupEditInfo) {
    popupElement.querySelector(".popup__input_type_name").value = document.querySelector(".profile__name").textContent;
    popupElement.querySelector(".popup__input_type_description").value = document.querySelector(".profile__description").textContent;
  }

  if (popupElement === popupAddPost) {
    popupElement.querySelector(".popup__input_type_name").value = "";
    popupElement.querySelector(".popup__input_type_description").value = "";
  }

  formValidationInstances[popupElement.getAttribute("id")].resetValidation();
}

// ----- Funcion para envio de formulario (Editar Perfil / Agregar Post) ----- //
const sendPopup = (popupElement) => {
  if (popupElement === popupEditInfo) {
    document.querySelector(".profile__name").textContent = popupElement.querySelector(".popup__input_type_name").value;
    document.querySelector(".profile__description").textContent = popupElement.querySelector(".popup__input_type_description").value;
  }

  if (popupElement === popupAddPost) {
    const newPost = new Card({ name: popupElement.querySelector(".popup__input_type_name").value, link: popupElement.querySelector(".popup__input_type_description").value }, "#element-template");

    const newPostElement = newPost.generateCard();

    postsContainer.prepend(newPostElement);
  }

  closePopup(popupElement);
}

// -------- Funcion para cerrar popups -------- //
const closePopup = (popupElement) => {
  if (popupElement === popupFullImage) {
    popupElement.querySelector(".popup__image").src = "";
    popupElement.querySelector(".popup__image").alt = "";
    popupElement.querySelector(".popup__image-title").textContent = "";
  }
  popupElement.classList.remove("popup_open");
}


// ----- Asignación de eventos a ventanas popup ----- //
const setPopupListeners = () => {
  //Apertura de popups
  openPopupButtons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      if(buttonElement === openAddPost) {
        openPopup(popupAddPost);
      }

      if(buttonElement === openEditInfo) {
        openPopup(popupEditInfo);
      }
    });
  });

  //Envío de formularios
  popupForms.forEach((formElement) => {
    formElement.querySelector(".popup__form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      sendPopup(formElement);
    });
  });

  //Cierre de popups con botón
  document.querySelectorAll(".popup__close-button").forEach((closeButton) => {
    closeButton.addEventListener("click", () => closePopup(closeButton.closest(".popup")));
  });

  //Cierre de popups con click en overlay
  document.querySelectorAll(".popup").forEach((popupElement) => {
    popupElement.addEventListener("click", (evt) => {
      if (evt.target === popupElement) {
        closePopup(popupElement);
      }
    });
  });

  //Cierre de popups con tecla "esc"
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && document.querySelector(".popup_open")) {
        closePopup(document.querySelector(".popup_open"));
      }
    });
}


// ----- Exportaciones ----- //
export { popupForms, openPopup, setPopupListeners };