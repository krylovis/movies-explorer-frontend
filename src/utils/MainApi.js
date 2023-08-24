class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponse)
  }

  getUserInfo() {
    return this._request(this._baseUrl + '/users/me', {
      headers: this._headers,
      credentials: 'include',
    })
  }

  getFilms() {
    return this._request(this._baseUrl + '/movies', {
      headers: this._headers,
      credentials: 'include',
    })
  }
}

// const baseUrl = 'https://api.movies.krylovis.nomoreparties.sbs';
const baseUrl = 'http://localhost:3002';

const headers = {
  'Content-Type': 'application/json',
};

export const mainApi = new Api({
  baseUrl: baseUrl,
  headers: headers,
});