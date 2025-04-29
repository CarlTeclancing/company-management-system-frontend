import './InputField.css';

const InputField = ({ label, name, type = 'text', value, onChange, placeholder, error }) => {
  return (
    <div className="input-field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
