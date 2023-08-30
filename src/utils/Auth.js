import { MAIN_BASE_URL } from '../utils/constants';

const headers = {
  'Content-Type': 'application/json'
};

const defaultOptions = (name, email, password) => {
  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  }
};

const request = (url, options) => {
  return fetch(`${MAIN_BASE_URL}/${url}`, options).then(getResponse)
};

const getResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({ name, email, password }) => {
  return request('signup', defaultOptions(name, email, password))
};

export const authorize = ({ email, password }) => {
  return request('signin', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })
};

export const tokenVerification = () => {
  return request('users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
};

export const logout = () => {
  return request('logout', {
    method: 'POST',
    credentials: 'include',
  })
};