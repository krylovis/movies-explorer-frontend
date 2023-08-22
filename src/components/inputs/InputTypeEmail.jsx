import { emailPattern } from '../../utils/constants';

export default function InputTypeEmail(props) {
  const { values, handleChange, isProfile } = props;
  const labelClass = `input__label ${isProfile ? 'input__label_type_profile' : ''}`;
  const inputClass = `input ${isProfile ? 'input_type_profile' : ''}`;

  return (
    <label className={labelClass} htmlFor="inputTypeEmail">
      E-mail
      <input
        className={inputClass}
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