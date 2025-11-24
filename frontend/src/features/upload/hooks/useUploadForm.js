import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRunContext } from "@/context/RunContext";
import { parseGpx } from "@/utils/parseGpx";
import { generateRunName } from "@/utils/generateRunName";
import { parseDurationToSeconds } from "@/utils/parseDurationToSeconds";

export function useUploadForm() {
  const navigate = useNavigate();
  const { addRun } = useRunContext();

  const [formData, setFormData] = useState({
    name: "",
    distance: "",
    duration: "", 
    date: "",
    type: "",
    notes: "",
    file: null,
    route: null,
    elapsedTime: "", 
  });

  const [showModal, setShowModal] = useState(false);
  const [tempName, setTempName] = useState("");
  const [pendingRun, setPendingRun] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const parsed = await parseGpx(file);

    setFormData((prev) => ({
      ...prev,
      file,
      distance: parsed.distanceMi?.toFixed(2) || "",
      duration: Number(parsed.movingTime) || 0, 
      date: parsed.date || "",
      route: parsed.route,
      elapsedTime: Number(parsed.elapsedTime) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const defaultName = generateRunName(formData.date, parseFloat(formData.distance));

    const distanceNum = parseFloat(formData.distance) || 0;

    const durationSeconds =
      typeof formData.duration === "string"
        ? parseDurationToSeconds(formData.duration)
        : Number(formData.duration) || 0;

    const elapsedTime =
      formData.elapsedTime && Number(formData.elapsedTime) > 0
        ? Number(formData.elapsedTime)
        : durationSeconds;

    const newRun = {
      id: crypto.randomUUID(),
      name: defaultName,
      date: formData.date,
      distance: distanceNum,
      duration: durationSeconds,
      elapsedTime,
      notes: formData.notes,
      type: formData.type,
      route: formData.route,
    };

    setPendingRun(newRun);
    setTempName(defaultName);
    setShowModal(true);
  };

  const handleConfirm = (finalName) => {
    addRun({ ...pendingRun, name: finalName });
    setShowModal(false);
    navigate("/runs");
  };

  const handleUseDefault = () => {
    addRun(pendingRun);
    setShowModal(false);
    navigate("/runs");
  };

  return {
    formData,
    showModal,
    tempName,
    setTempName,
    handleChange,
    handleFile,
    handleSubmit,
    handleConfirm,
    handleUseDefault,
  };
}
