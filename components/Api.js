export default class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // ----- Verifica la respuesta del servidor ----- //
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  // ----- Metodo para cargar la información del usuario (GET) ----- //
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al cargar la información del usuario: ${err}`));
  }

  // ----- Metodo para cargar los posts iniciales (GET) ----- //
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al cargar las tarjetas: ${err}`));
  }

  // ----- Obtener información del usuario y tarjetas iniciales simultáneamente ----- //
  getAppInfo() {
      return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // ----- Metodo para editar el perfil (PATCH) ----- //
  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al editar el perfil: ${err}`));
  }

  // ----- Metodo para agregar un nuevo post (POST) ----- //
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al agregar la tarjeta: ${err}`));
  }

  // ----- Metodo para eliminar un post (DELETE) ----- //
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al eliminar la tarjeta ${cardId}: ${err}`));
  }

  // ----- Metodo para añadir "me gusta" (PUT) ----- //
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al dar like a la tarjeta ${cardId}: ${err}`));
  }

  // ----- Metodo para eliminar "me gusta" (DELETE) ----- //
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al quitar like a la tarjeta ${cardId}: ${err}`));
  }

  // ----- Metodo para actualizar la foto de perfil (PATCH) ----- //
  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => this._checkResponse(res))
    .catch(err => console.log(`Error al actualizar el avatar: ${err}`));
  }

}