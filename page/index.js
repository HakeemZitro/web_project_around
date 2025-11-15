// ----- Importaciones ----- //
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card  from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import { configFormValidation, serverBaseUrl, serverRequestHeaders } from "../utils/constants.js";
var postsList = null;

// ----- Genera la instancia de la API ----- //
const api = new Api(serverBaseUrl, serverRequestHeaders);


// ----- Genera la instancia de la informacion de perfil ----- //
const profileInfo = new UserInfo({name: ".profile__name", about: ".profile__description", avatar: ".profile__image"});


// ----- Muestra la informacion de la WEB solo hasta que recibe la informacion de perfil y las tarjetas del servidor ----- //
api.getAppInfo()
  .then(([userInfo, initialCards]) => {
    profileInfo.setUserInfo(userInfo);

    postsList = new Section({
      items: initialCards,
      renderer: (item) => {
        const post = new Card(item, "#element-template",
        function handleCardClick(item) {
          popupFullImage.open(item);
        },
        function handleLikeClick(item) {
          const apiRequest = item.isLiked ? api.removeLike(item.cardId) : api.addLike(item.cardId);
          apiRequest
            .then(postUpdated => {
              post.toggleLikeButton(postUpdated);
            })
            .catch(err => console.log(`Error con el like del post ${item.cardId}: Error ${err}`));
        },
        function handleDeleteClick(postInstance) {
          popupDeletePost.open(postInstance);
        }
      );
      const postElement = post.generateCard();
      postsList.addInitialItem(postElement);
    }}, ".elements"
    );
    postsList.renderItems();
  })
  .catch(err => console.log(`Error al cargar la información inicial: ${err}`));


// ----- Genera las instancias de los validadores de formularios ----- //
const editInfoValidator = new FormValidator(configFormValidation, "#popup-edit-info");
editInfoValidator.enableValidation();

const addPostValidator = new FormValidator(configFormValidation, "#popup-add-post");
addPostValidator.enableValidation();

const editAvatarValidator = new FormValidator(configFormValidation, "#popup-profile-picture");
editAvatarValidator.enableValidation();


// ----- Genera las instancias de popups ----- //
// Popup editar info
const popupEditInfo = new PopupWithForm("#popup-edit-info",
  function handleFormSubmit(info) {
    popupEditInfo.renderLoading(true, "Guardando...");
    api.editProfile(info)
      .then((updatedInfo) => {
        profileInfo.setUserInfo(updatedInfo);
        popupEditInfo.close();
      })
      .catch(err => console.log(`Error al actualizar la información de perfil: Error ${err}`))
      .finally(() => popupEditInfo.renderLoading(false));
  }
);
popupEditInfo.setEventListeners();
document.querySelector(".profile__edit-button").addEventListener("click", () => {
  popupEditInfo.setInputValues("Profile Info", profileInfo.getUserInfo());
  editInfoValidator.resetValidation();
  popupEditInfo.open();
});

const popupEditAvatar = new PopupWithForm("#popup-profile-picture",
  function handleFormSubmit(info) {
    popupEditAvatar.renderLoading(true, "Guardando...");
    api.updateAvatar(info)
      .then((updatedAvatar) => {
        profileInfo.setUserInfo(updatedAvatar);
        popupEditAvatar.close();
      })
      .catch(err => console.log(`Error al actualizar la foto de perfil: Error ${err}`))
      .finally(() => popupEditAvatar.renderLoading(false));
  }
)
popupEditAvatar.setEventListeners();
document.querySelector(".profile__edit-image").addEventListener("click", () => {
  popupEditAvatar.setInputValues("", profileInfo.getUserInfo());
  editAvatarValidator.resetValidation();
  popupEditAvatar.open();
});

// Popup agregar post
const popupAddPost = new PopupWithForm("#popup-add-post",
  function handleFormSubmit(item) {
    popupAddPost.renderLoading(true, "Creando...");
    api.addCard(item)
    .then((newPostInfo) => {
      const newPost = new Card(newPostInfo, "#element-template",
      function handleCardClick(item) {
        popupFullImage.open(item);
      },
      function handleLikeClick(item) {
        const apiRequest = item.isLiked ? api.removeLike(item.cardId) : api.addLike(item.cardId);
        apiRequest
          .then(postUpdated => {
            newPost.toggleLikeButton(postUpdated);
          })
          .catch(err => console.log(`Error con el like del post ${item.cardId}: Error ${err}`));
      },
      function handleDeleteClick(postInstance) {
        popupDeletePost.open(postInstance);
      }
      );
      const newPostElement = newPost.generateCard();
      postsList.addNewItem(newPostElement);
      popupAddPost.close();
    })
    .catch(err => console.log(`Error al crear nueva tarjeta: Error ${err}`))
    .finally(() => popupAddPost.renderLoading(false));
});
popupAddPost.setEventListeners();
document.querySelector(".profile__add-button").addEventListener("click", () => {
  addPostValidator.resetValidation();
  popupAddPost.open()
});

// Popup confirmar eliminación
const popupDeletePost = new PopupWithConfirmation("#popup-delete-post",
  function handleConfirmationSubmit(post) {
    popupDeletePost.renderLoading(true, "Eliminando...");
    api.deleteCard(post._id)
      .then(() => {
        post.removeCardElement();
        popupDeletePost.close();
      })
      .catch(err => `Error con la eliminación del post ${cardId}: Erorr ${err}`)
      .finally(() => popupDeletePost.renderLoading(false));
});
popupDeletePost.setEventListeners();

// Popup imagen completa
const popupFullImage = new PopupWithImage("#popup-full-image");
popupFullImage.setEventListeners();


/*
setInterval(function () {
  console.clear();
  fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
    headers: serverRequestHeaders
  })
  .then(res => res.json())
  .then(data => console.log(data));

  fetch("https://around-api.es.tripleten-services.com/v1/users/me", {
    headers: serverRequestHeaders
  })
  .then(res => res.json())
  .then(data => console.log(data));
}
, 10000);
*/


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