import React, { useEffect, useState } from "react";
import { noteStore } from "../store/noteStore";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Pencil } from "lucide-react";

const NoteDetail = () => {
  const { note, getNoteById, isNoteLoading, updateNote } = noteStore();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNoteById(id);
  }, [id, getNoteById]);

  const handleUpdateClick = () => {
    setNewDesc(note?.description || "");
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newDesc.trim()) return;
    let data = { description: newDesc };
    await updateNote(id, data);

    setIsModalOpen(false);
  };

  if (isNoteLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Note Detail</h1>

      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
        {note?.description || "No description available."}
      </p>

      <button
        onClick={handleUpdateClick}
        className="mt-5 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        <Pencil size={18} />
        Update Note
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Update Description</h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteDetail;
