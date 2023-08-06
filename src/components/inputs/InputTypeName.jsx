export default function InputTypeName(props) {
  const { values, handleChange, isProfile } = props;
  const labelClass = `input__label ${isProfile ? 'input__label_type_profile' : ''}`;
  const inputClass = `input ${isProfile ? 'input_type_profile' : ''}`;

  return (
    <label className={labelClass} htmlFor="inputTypeName">
      Имя
      <input
        className={inputClass}
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