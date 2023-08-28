import { MAIN_BASE_URL } from '../utils/constants';
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

  editUserInfo(body) {
    const { name, email } = body;
    return this._request(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
      credentials: 'include',
    })
  }

  saveMovie(movie) {
    return this._request(this._baseUrl + '/movies', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie),
      credentials: 'include',
    })
  }

  deleteMovie(id) {
    console.log('id', id);
    return this._request(this._baseUrl + '/movies/' + id, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
  }

  getMovies() {
    return this._request(this._baseUrl + '/movies', {
      headers: this._headers,
      credentials: 'include',
    })
  }
}

const headers = {
  'Content-Type': 'application/json',
};

export const mainApi = new Api({
  baseUrl: MAIN_BASE_URL,
  headers: headers,
});