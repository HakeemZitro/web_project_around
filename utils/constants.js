// ----- Posts iniciales y configurador de validador ----- //
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

export { initialCards, configFormValidation };