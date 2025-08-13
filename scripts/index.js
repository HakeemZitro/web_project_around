// ----- Importaciones ----- //
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { popupForms, setPopupListeners } from "./utils.js";


// ----- Datos iniciales y plantillas ----- //
const initialCards = [
  { name: "Welcome to Fabulous Las Vegas", link: "./images/Welcome_Las_Vegas.avif" },
  { name: "Seattle Space Needle", link: "./images/Space_Needle.avif" },
  { name: "Chicago Cloud Gate", link: "./images/Cloud_Gate.avif" },
  { name: "Santa Monica Pier", link: "./images/Santa_Monica_Pier.avif" },
  { name: "SF Golden Gate", link: "./images/Golden_Gate.avif" },
  { name: "NY Central Park", link: "./images/Central_Park.avif" }
];
const configFormValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
const postsContainer = document.querySelector(".elements");
const formValidationInstances = {};


// ----- Carga posts iniciales ----- //
const renderInitialPosts = () => {
  postsContainer.innerHTML = "";

  initialCards.forEach((card) => {
    const post = new Card(card, "#element-template");

    const postElement = post.generateCard();

    postsContainer.append(postElement);
  });
}
renderInitialPosts();


// ----- Inicia la validacion de formularios ----- //
const initiateFormsValidation = () => {
  popupForms.forEach((popupForm) => {
    const form = new FormValidator(configFormValidation, popupForm);

    form.enableValidation();
    formValidationInstances[popupForm.getAttribute("id")] = form;
  });
}
initiateFormsValidation();


// ----- Inicia la asignacion de eventos para ventanas popup ----- //
setPopupListeners();


// ----- Exportaciones ----- //
export { postsContainer, formValidationInstances };