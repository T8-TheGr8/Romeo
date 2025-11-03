import Modal from "@/components/ui/Modal";
import RunInput from "@/features/runs/components/RunInput";
import { useUploadForm } from "../hooks/useUploadForm";
import "../styles/Upload.css";

export default function Upload() {
  const {
    formData,
    showModal,
    tempName,
    setTempName,
    handleChange,
    handleFile,
    handleSubmit,
    handleConfirm,
  } = useUploadForm();

  return (
    <div className="upload-page">
      <h2 className="section-title">Add a Run</h2>

      <form className="upload-form card" onSubmit={handleSubmit}>
        {/* Manual fields (required only if no gpx file uploaded) */}
        <RunInput
          label="Distance (mi)"
          type="number"
          step="0.01"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          required={!formData.file}
        />

        <RunInput
          label="Duration (HH:MM:SS)"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required={!formData.file}
        />

        <RunInput
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required={!formData.file}
        />

        <RunInput
          label="Run Type"
          type="select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          options={["tempo", "long", "recovery", "race"]}
        />

        <RunInput
          label="Notes"
          name="notes"
          multiline
          value={formData.notes}
          onChange={handleChange}
        />

        {/* GPX Upload */}
        <RunInput
          label="Or, upload a GPX file"
          type="file"
          accept=".gpx"
          name="file"
          onChange={handleFile}
        />

        <button className="btn" type="submit">
          Save Run
        </button>
      </form>

      <Modal
        show={showModal}
        nameValue={tempName}
        setName={setTempName}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
