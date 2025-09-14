import React, { useState } from "react";
import { LogOut, Plus, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { noteStore } from "../store/noteStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  const { createNote, isCreating } = noteStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");


  const logoutUser = async () => {
    await logout();
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    await createNote({ description });
    setDescription("");
    setIsModalOpen(false); 
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Tenants</h1>

          {/* Create Note Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            <span>Create Note</span>
          </button>

          {/* Logout */}
          <button
            onClick={logoutUser}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ease-in-out"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Create a Note</h2>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter note description..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                rows="4"
              />

              <button
                type="submit"
                disabled={isCreating}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isCreating ? "Creating..." : "Create Note"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
