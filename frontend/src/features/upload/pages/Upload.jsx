import Modal from "@/components/ui/Modal";
import RunInput from "../components/RunInput";
import Card from "@/components/ui/Card";
import { useUploadForm } from "../hooks/useUploadForm";
import PageTransition from "@/components/layout/PageTransition.jsx";

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
    <PageTransition>
      <div className="page">
        <Card sunken="false" title="Manual Upload">
          <form class="space-between" onSubmit={handleSubmit}>
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
              options={["Long Run", "Race", "Workout", "Tempo", "Interval", "Easy", "Recovery", "Warmup", "Cooldown"]}
            />

            <RunInput
              label="Notes"
              name="notes"
              multiline
              value={formData.notes}
              onChange={handleChange}
              placeholder="How did it go?"
            />

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
        </Card>
        <Modal
          show={showModal}
          nameValue={tempName}
          setName={setTempName}
          onConfirm={handleConfirm}
        />
      </div>
    </PageTransition>
  );
}
