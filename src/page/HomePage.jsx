import { useEffect } from "react";
import { noteStore } from "../store/noteStore";
import {
  StickyNote,
  Building2,
  Loader2,
  Trash2,
  Rocket,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { upgradeStore } from "../store/upgradeStore";
import { useAuthStore } from "../store/useAuthStore";
const HomePage = () => {
  const { notes, getAllNotes, isNotesLoading, deleteNote } = noteStore();
  const { upgrade, isUpgrading } = upgradeStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  if (isNotesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <StickyNote className="w-8 h-8 text-blue-600" />
          </div>
          My Notes
        </h1>

        {notes.length === 0 ? (
          <div className="text-center text-gray-500 mt-32">
            <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto">
              <StickyNote className="mx-auto w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No notes yet
              </h3>
              <p className="text-gray-500">
                Start creating your first note to get organized!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {notes
              .filter((item) => item && item._id && item?.tenant)
              .map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-3xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative border border-gray-100 min-h-[220px]"
                >
                  {/* Delete Icon */}
                  <button
                    onClick={() => deleteNote(item._id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                    title="Delete Note"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-4 mb-6 mt-2">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <StickyNote className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {item?.tenant?.slug}
                    </h2>
                  </div>

                  <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-4">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="font-medium">{item?.tenant?.slug}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link to={`/notes/${item._id}`}>
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                          title="View Note"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </Link>

                      {authUser.role == "Admin" && (
                        <button
                        onClick={() => upgrade(item.tenant._id)}
                        disabled={isUpgrading}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-1.5 text-sm font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Upgrade Plan"
                      >
                        <Rocket className="w-4 h-4" />
                        <span>{isUpgrading ? "Upgrading..." : "Upgrade"}</span>
                      </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
