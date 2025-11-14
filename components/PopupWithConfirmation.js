import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmationSubmit) {
    super(popupSelector);
    this._handleConfirmationSubmit = handleConfirmationSubmit;

  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".popup__form").addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleConfirmationSubmit(this._postData);
    });
  }

  open(postData) {
    super.open();
    this._postData = postData;
  }

  close() {
    super.close();
    this._postData = null;
  }
}