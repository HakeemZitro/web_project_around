// ----- Genera las publicaciones iniciales ----- //
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
    function handleDeleteClick(item) {
      popupDeleteCard.open(item);
    },
    userId // El ID del usuario actual
  );
  return post.generateCard();
}}, ".elements"
);
postsList.renderItems();