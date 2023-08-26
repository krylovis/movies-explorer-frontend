import React from 'react';
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
  const [error, setError] = React.useState(inputValues);
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const { value, name, type } = event.target;
    setValues({ ...values, [name]: value });
  };

  const currentUser = React.useContext(CurrentUserContext);

  return { values, handleChange, setValues };
};