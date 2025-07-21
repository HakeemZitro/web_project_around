// -------- FUNCION QUE MUESTRA ERROR EN INPUT -------- //
function showInputError (popupElement, inputElement, errorMessage, config) {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// -------- FUNCION QUE ESCONDE ERROR EN INPUT -------- //
function hideInputError (popupElement, inputElement, config) {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// -------- FUNCION QUE DECIDE SI MOSTRAR / ESCONDER ERROR EN INPUT -------- //
function checkInputValidity (popupElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(popupElement, inputElement, config);
  }
};

// -------- FUNCION QUE DETERMINA SI HAY UN INPUT ERRONEO -------- //
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// -------- FUNCION QUE DESABILITA EL BOTON DE ENVIO SI HAY UN INPUT ERRONEO -------- //
function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

// -------- FUNCION PARA ASIGNAR EVENTOS "INPUT" EN LOS DIFERENTES FORMULARIOS -------- //
function setEventListeners (popupElement, config) {
  const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));
  const buttonElement = popupElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(popupElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// -------- FUNCION PARA ASIGNAR EVENTOS "SUBMIT" EN LOS DIFERENTES FORMULARIOS Y COMENZAR LA VALIDACION DE ESTOS -------- //
function enableValidation (config) {
  const popupList = Array.from(document.querySelectorAll(config.formSelector));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener("submit", function (evt) {
      const nameInput = popupElement.querySelector(".popup__input_type_name");
      const descriptionInput = popupElement.querySelector(".popup__input_type_description");

      evt.preventDefault();
      sendPopup(popupElement.closest(".popup"), nameInput, descriptionInput);
    });
    setEventListeners(popupElement, config);
  });
};

// -------- SE DEFINE EL OBJETO DE CONFIGURACION Y SE LLAMA A LA FUNCION "enableValidation" CON ESTE OBJETO DE PARAMETRO -------- //
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};
enableValidation(config);


// -------- FUNCION PARA REINICIAR LA VALIDACION DE LOS INPUTS -------- //
function resetValidation (popupElement, config) {
  const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(popupElement, inputElement, config);
  });
};