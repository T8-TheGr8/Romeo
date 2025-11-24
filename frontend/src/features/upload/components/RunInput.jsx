import "../styles/RunInput.css";

export default function RunInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  options = [],
  accept,
  multiline = false,
}) {
  return (
    <div className="run-input-group">
      <label htmlFor={name}>
        {label}
      </label>

      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="sunken user-input"
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows="3"
          required={required}
          className="sunken user-input"
          placeholder="How did it feel?"
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          required={required}
          accept={accept}
          className="sunken user-input"
        />
      )}
    </div>
  );
}
