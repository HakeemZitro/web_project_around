// ----- Importaciones ----- //
import Section from "../components/Section.js";
import Card  from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, configFormValidation, serverBaseUrl, serverRequestHeaders } from "../utils/constants.js";



// ----- Genera la instancia de la informacion de perfil ----- //
const profileInfo = new UserInfo({name: ".profile__name", description: ".profile__description"});



// ----- Genera las instancias de los validadores de formularios ----- //
const editInfoValidator = new FormValidator(configFormValidation, "#popup-edit-info");
editInfoValidator.enableValidation();

const addPostValidator = new FormValidator(configFormValidation, "#popup-add-post");
addPostValidator.enableValidation();



// ----- Genera las instancias de popups ----- //
// Popup editar info
const popupEditInfo = new PopupWithForm("#popup-edit-info",
  function handleFormSubmit(info) {
    profileInfo.setUserInfo(info);
  }
);
popupEditInfo.setEventListeners();
document.querySelector(".profile__edit-button").addEventListener("click", () => {
  popupEditInfo.setInputValues(profileInfo.getUserInfo());
  editInfoValidator.resetValidation()
  popupEditInfo.open()
});

// Popup agregar post
const popupAddPost = new PopupWithForm("#popup-add-post",
  function handleFormSubmit(item) {
    const newPost = new Card(item, "#element-template",
      function handleCardClick(item) {
        popupFullImage.open(item);
      }
    );

    const newPostElement = newPost.generateCard();
    postsList.addItem(newPostElement);
  }
);
popupAddPost.setEventListeners();
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addPostValidator.resetValidation();
  popupAddPost.open()
});

// Popup imagen completa
const popupFullImage = new PopupWithImage("#popup-full-image");
popupFullImage.setEventListeners();



// ----- Genera las publicaciones iniciales ----- //
const postsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const post = new Card(item, "#element-template",
      function handleCardClick({ name, link }) {
        popupFullImage.open({ name, link });
      }
    );

    const postElement = post.generateCard();
    postsList.addItem(postElement);
  }}, ".elements"
);
postsList.renderItems();