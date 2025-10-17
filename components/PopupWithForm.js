import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const popupFormValues = {
      name: this._popup.querySelector(".popup__input_type_name").value,
      link: this._popup.querySelector(".popup__input_type_description").value,
      description: this._popup.querySelector(".popup__input_type_description").value
    };
    return popupFormValues;
  }

  setInputValues({name, description}) {
    this._popup.querySelector(".popup__input_type_name").value = name;
    this._popup.querySelector(".popup__input_type_description").value = description;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector(".popup__form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popup.querySelector(".popup__form").reset();
  }
}