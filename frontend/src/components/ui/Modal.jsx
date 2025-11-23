import "../styles/Modal.css";
import Card from "@/components/ui/Card.jsx";

export default function Modal({ show, nameValue, setName, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <Card title="Run Saved Successfully!" sunken="false" className="modal-card">
        <p>You can give this run a custom name — or keep the default below.</p>

        <input
          type="text"
          className="modal-input sunken"
          value={nameValue}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn" onClick={() => onConfirm(nameValue)}>Save Name</button>
        </div>
      </Card>
    </div>
  );
}
