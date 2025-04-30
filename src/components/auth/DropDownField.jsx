

const DropdownField = ({ label, name, value, onChange, options, placeholder = "Select an option", error }) => {
  return (
    <div className="dropdown-field">
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default DropdownField;
