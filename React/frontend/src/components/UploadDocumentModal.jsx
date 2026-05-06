import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

export default function UploadDocumentModal({
  show,
  onHide,
  customerId,
  policyId,
  onUploaded
}) {
  const [file, setFile] = useState(null);

  const uploadDocument = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    // Attach the correct foreign key
    if (customerId) formData.append("customer", customerId);
    if (policyId) formData.append("policy", policyId);

    try {
      await axios.post("http://localhost:8000/api/documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      onUploaded(); // refresh list
      onHide();     // close modal
    } catch (err) {
      console.error("Upload error:", err.response?.data || err);
    }
  };

  return (
    <Modal open={show} onClose={onHide}>
      <h2 className="text-xl font-bold mb-4">Upload Document</h2>

      <input
        type="file"
        className="border p-2 rounded w-full mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={uploadDocument}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload
      </button>
    </Modal>
  );
}
