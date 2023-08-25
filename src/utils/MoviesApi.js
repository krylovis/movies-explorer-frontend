const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const headers = {
  'Content-Type': 'application/json'
};

const request = (url, options) => {
  return fetch(`${BASE_URL}/${url}`, options).then(getResponse)
};

const getResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMoviesApi = () => {
  return request('', {
    method: 'GET',
    headers,
  })
};
