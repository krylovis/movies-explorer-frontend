export default function InputTypeName(props) {
  const { values, handleChange } = props;
  return (
    <label className="input__label" htmlFor="inputTypeName">
      Имя
      <input
        className="input input_name"
        id="inputTypeName"
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="input__error-message inputTypeName-error" />
    </label>
  )
}