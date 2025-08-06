

const DescriptionField = ({ label, name, value, onChange, placeholder, error }) => {
  return (
    <div className="description-field">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? 'error' : ''}
        rows="4"
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default DescriptionField;
