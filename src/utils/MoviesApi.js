import { MOVIES_BASE_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json'
};

const request = (url, options) => {
  return fetch(`${MOVIES_BASE_URL}/${url}`, options).then(getResponse)
};

const getResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMoviesApi = () => {
  return request('beatfilm-movies', {
    method: 'GET',
    headers,
  })
};
