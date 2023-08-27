import React, { useCallback } from 'react';
import { regexForEmail, regexForName, regexForQuery } from '../utils/constants';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function useForm(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};

export function useFormWithValidator(inputValues = {}) {
  const [values, setValues] = React.useState(inputValues);
  const [errors, setErrors] = React.useState(inputValues);
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { value, name, id, validationMessage } = target;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [id]: validationMessage });
    setIsValid(target.closest('form').checkValidity());

    const isEmailInput = name === 'email' && validationMessage && (value.length >= 1);
    const isQueryInput = name === 'query';
    const isNameInput = name === 'name' && (value.length < 2 || value.length > 40);
    const isPasswordInput = name === 'password' && (value.length < 6 || value.length > 20);

    const inputErrorMessage = target.closest(`[for=${id}]`).querySelector('.input__error-message');
    if (isEmailInput) {
      inputErrorMessage.textContent = 'Пример почты "example@example.com"';
    } else if (isQueryInput && validationMessage) {
      inputErrorMessage.textContent = 'Нужно ввести ключевое слово';
    } else if (isNameInput && (value.length >= 1)) {
      inputErrorMessage.textContent = 'Нужно ввести от 2 до 40 символов';
    } else if (isPasswordInput && (value.length >= 1)) {
      inputErrorMessage.textContent = 'Введите от 6 до 20 символов';
    } else {
      inputErrorMessage.textContent = validationMessage;
    }
  };

  return { values, errors, isValid, handleChange, setValues, setIsValid };
};