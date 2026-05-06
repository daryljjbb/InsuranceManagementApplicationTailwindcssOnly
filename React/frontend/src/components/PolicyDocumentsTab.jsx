import { useEffect, useState } from "react";
import axios from "axios";
import UploadDocumentModal from "./UploadDocumentModal";

export default function PolicyDocumentsTab({ policyId }) {
  const [documents, setDocuments] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const loadDocuments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/documents/?policy=${policyId}`
      );
      setDocuments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Policy document fetch error:", err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [policyId]);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Policy Documents</h2>

        <button
          onClick={() => setShowUpload(true)}
          className="px-3 py-1 bg-green-600 text-white rounded"
        >
          Upload Document
        </button>
      </div>

      <div className="bg-white shadow rounded">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">File Name</th>
              <th className="p-3 text-left">Uploaded</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <tr
                  key={doc.id}
                  className="border-b hover:bg-gray-50 opacity-0 animate-[fadeIn_0.35s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <td className="p-3">{doc.file_name}</td>

                  <td className="p-3">
                    {new Date(doc.uploaded_at).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <UploadDocumentModal
        show={showUpload}
        onHide={() => setShowUpload(false)}
        policyId={policyId}
        onUploaded={loadDocuments}
      />
    </div>
  );
}
