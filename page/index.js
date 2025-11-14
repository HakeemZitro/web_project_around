// ----- Importaciones ----- //
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card  from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, configFormValidation, serverBaseUrl, serverRequestHeaders } from "../utils/constants.js";


// ----- Genera la instancia de la API ----- //
const api = new Api(serverBaseUrl, serverRequestHeaders);


// ----- Genera la instancia de la informacion de perfil ----- //
const profileInfo = new UserInfo({name: ".profile__name", about: ".profile__description", avatar: ".profile__image"});


api.getAppInfo()
  .then(([userInfo, initialCards]) => {
    profileInfo.setUserInfo(userInfo);

    const postsList = new Section({
      items: initialCards,
      renderer: (item) => {
        const post = new Card(
        item,
        "#element-template",
        function handleCardClick(item) {
          popupFullImage.open(item);
        },
        function handleLikeClick(item) {
          const apiRequest = item.isLiked ? api.removeLike(item.cardId) : api.addLike(item.cardId);
          apiRequest
            .then(postUpdated => {
              post.toggleLikeButton(postUpdated);
            })
            .catch(err => console.log(`Error con el like del post ${item.cardId}: Erorr ${err}`));
        },
        function handleDeleteClick(postInstance) {
          popupDeleteCard.open(postInstance);
        }
      );
      const postElement = post.generateCard();
      postsList.addItem(postElement);
    }}, ".elements"
    );
    postsList.renderItems();
  })
  .catch(err => {
    console.log(`Error al inicializar la aplicación: ${err}`);
});


fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: serverRequestHeaders
})
.then(res => res.json())
.then(data => console.log(data));




// ----- Genera las instancias de los validadores de formularios ----- //
const editInfoValidator = new FormValidator(configFormValidation, "#popup-edit-info");
editInfoValidator.enableValidation();

const addPostValidator = new FormValidator(configFormValidation, "#popup-add-post");
addPostValidator.enableValidation();

const profilePictureValidator = new FormValidator(configFormValidation, "#popup-profile-picture");
profilePictureValidator.enableValidation();



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
const popupDeleteCard = new PopupWithConfirmation("#popup-delete-post",
  function handleConfirmationSubmit(post) {
    api.deleteCard(post._id)
      .then(() => {
        post.removeCardElement();
        popupDeleteCard.close();
      })
      .catch(err => `Error con la eliminación del post ${cardId}: Erorr ${err}`)
  }
);
popupDeleteCard.setEventListeners();


// Popup imagen completa
const popupFullImage = new PopupWithImage("#popup-full-image");
popupFullImage.setEventListeners();




/*
// ----- Genera las publicaciones iniciales ----- //
const postsList = new Section({
  items: api.getInitialCards,
  renderer: (item) => {
    const post = new Card(
    item,
    "#element-template",
    function handleCardClick(item) {
      popupFullImage.open(item);
    },
    function handleLikeClick(item) {
      const apiRequest = item.isLiked ? api.removeLike(item.cardId) : api.addLike(item.cardId);
      apiRequest
        .then(postUpdated => {
          post.toggleLikeButton(postUpdated);
        })
        .catch(err => console.log(`Error con el like del post ${item.cardId}: Erorr ${err}`));
    },
    function handleDeleteClick(item) {
      popupDeleteCard.open(item);
      popupDeleteCard.setEventListeners();
    }
  );
  return post.generateCard();
}}, ".elements"
);
postsList.renderItems();


fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  method: 'POST',
  headers: serverRequestHeaders,
  body: JSON.stringify({
    link: "https://www.caminoreal.com/storage/app/media/Blog/fin-de-semana-cdmx.jpg",
    name: "CDMX"
  })
})

*/




/*
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
*/