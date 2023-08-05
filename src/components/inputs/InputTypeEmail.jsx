import { emailPattern } from '../../utils/constants';

export default function InputTypeEmail(props) {
  const { values, handleChange } = props;
  return (
    <label className="input__label" htmlFor="inputTypeEmail">
      E-mail
      <input
        className="input input_email"
        id="inputTypeEmail"
        type="email"
        name="email"
        pattern={emailPattern}
        value={values.email}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="input__error-message inputTypeEmail-error" />
    </label>
  )
}