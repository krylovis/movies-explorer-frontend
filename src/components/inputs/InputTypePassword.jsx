export default function InputTypePassword(props) {
  const { values, handleChange } = props;
  return (
    <label className="input__label" htmlFor="inputTypePassword">
      Пароль
      <input
        className="input input_password"
        id="inputTypePassword"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        minLength="6"
        maxLength="20"
        required
      />
      <span className="input__error-message inputTypePassword-error"></span>
    </label>
  )
}