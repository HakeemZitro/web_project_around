export default class Card {
  constructor ({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
  }

  _handleLikeButton() {
    this._element.querySelector(".element__like").classList.toggle("element__like_active");
  }

  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners() {
    //Like post
    this._element.querySelector(".element__like").addEventListener("click", () => {
      this._handleLikeButton();
    });

    //Eliminar post
    this._element.querySelector(".element__trash").addEventListener("click", () => {
      this._handleDeleteButton();
    });

    //Abrir imagen completa
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick({name: this._name, link: this._link});
    });
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector(".element").cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;

    return this._element;
  }
}