import "../styles/Modal.css";

export default function Modal({ show, nameValue, setName, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Run Saved Successfully!</h3>
        <p>You can give this run a custom name — or keep the default below.</p>

        <input
          type="text"
          className="modal-input"
          value={nameValue}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={() => onConfirm(nameValue)}>Save Name</button>
        </div>
      </div>
    </div>
  );
}
