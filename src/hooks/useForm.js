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

    const inputErrorMessage = target.closest(`[for=${id}]`).querySelector('.input__error-message');
    inputErrorMessage.textContent = validationMessage;
  };

  return { values, errors, isValid, handleChange, setValues, setIsValid };
};