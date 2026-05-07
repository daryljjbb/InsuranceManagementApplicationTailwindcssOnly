import { useEffect, useState } from "react";
import axios from "axios";
import UploadDocumentModal from "./UploadDocumentModal";
import { Trash2 } from "lucide-react";
import {
  AiFillFilePdf,
  AiFillFileImage,
  AiFillFileWord,
  AiFillFileExcel,
  AiFillFile
} from "react-icons/ai";



export default function CustomerDocumentsTab({ customerId }) {
  const [documents, setDocuments] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const loadDocuments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/documents/?customer=${customerId}`
      );
      setDocuments(res.data.results || res.data || []);

    } catch (err) {
      console.error("Document fetch error:", err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, [customerId]);

  const deleteDocument = async (docId) => {
  if (!window.confirm("Delete this document?")) return;

  try {
    await axios.delete(`http://localhost:8000/api/documents/${docId}/`);
    loadDocuments(); // refresh list
  } catch (err) {
    console.error("Delete error:", err);
  }
};

const getFileIcon = (fileName) => {
  if (!fileName) return <AiFillFile size={22} color="#555" />;

  const ext = fileName.split(".").pop().toLowerCase();

  switch (ext) {
    case "pdf":
      return <AiFillFilePdf size={22} color="#d9534f" />; // red
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <AiFillFileImage size={22} color="#0275d8" />; // blue
    case "doc":
    case "docx":
      return <AiFillFileWord size={22} color="#1e90ff" />; // Word blue
    case "xls":
    case "xlsx":
      return <AiFillFileExcel size={22} color="#5cb85c" />; // green
    default:
      return <AiFillFile size={22} color="#555" />; // gray default
  }
};

const [previewDoc, setPreviewDoc] = useState(null);
const [showPreview, setShowPreview] = useState(false);

const openPreview = (doc) => {
  setPreviewDoc(doc);
  setShowPreview(true);
};

const closePreview = () => {
  setPreviewDoc(null);
  setShowPreview(false);
};




  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customer Documents</h2>
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
                  <td className="p-3 flex items-center gap-2">
                    {getFileIcon(doc.file_name)}
                    {doc.file_name}
                  </td>

                  <td className="p-3">
                    {new Date(doc.uploaded_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center flex items-center justify-center gap-4">
                    <button
                    onClick={() => openPreview(doc)}
                    className="text-blue-600 hover:underline"
                    >
                    View
                    </button>
                    <button
                        onClick={() => deleteDocument(doc.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Document"
                    >
                        <Trash2 size={18} />
                    </button>
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
        customerId={customerId}
        onUploaded={loadDocuments}
      />

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-bold">Preview Document</h2>
                <button onClick={closePreview} className="text-gray-600 hover:text-black">
                ✕
                </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-auto flex-1">
                {previewDoc && (() => {
                const ext = previewDoc.file_name.split(".").pop().toLowerCase();

                // IMAGE PREVIEW
                if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
                    return (
                    <img
                        src={previewDoc.file_url}
                        alt={previewDoc.file_name}
                        className="max-w-full max-h-[70vh] mx-auto rounded"
                    />
                    );
                }

                // PDF PREVIEW
                if (ext === "pdf") {
                    return (
                    <iframe
                        src={previewDoc.file_url}
                        title="PDF Preview"
                        className="w-full h-[70vh] border rounded"
                    />
                    );
                }

                // FALLBACK
                return (
                    <div className="text-center py-6">
                    <p className="mb-4">No preview available for this file type.</p>
                    <a
                        href={previewDoc.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        Download File
                    </a>
                    </div>
                );
                })()}
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-right">
                <button
                onClick={closePreview}
                className="px-4 py-2 bg-gray-600 text-white rounded"
                >
                Close
                </button>
            </div>
            </div>
        </div>
        )}

    </div>
  );
}

