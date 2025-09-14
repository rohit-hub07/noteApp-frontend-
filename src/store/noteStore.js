import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const noteStore = create((set) => ({
  note: null,
  notes: [],
  isNoteLoading: false,
  isNotesLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  createNote: async (data) => {
    set({ isCreating: true });
    try {
      const res = await axiosInstance.post("/notes", data);
      // Add the new note to the local notes array
      set((state) => ({
        notes: [res.data.newNote, ...state.notes],
      }));
      toast.success(res.data.message);
    } catch (error) {
      console.log("Error while creating note: ", error.message);
      const errMsg = error?.response?.data?.message || "Failed to create note";
      toast.error(errMsg);
    } finally {
      set({ isCreating: false });
    }
  },

  getAllNotes: async () => {
    set({ isNotesLoading: true });
    try {
      const res = await axiosInstance.get("/notes");
      set({ notes: res.data.allNotes });
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    } finally {
      set({ isNotesLoading: false });
    }
  },

  getNoteById: async (id) => {
    set({ isNoteLoading: true });
    try {
      const res = await axiosInstance.get(`/notes/${id}`);
      set({ note: res.data.note });
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    } finally {
      set({ isNoteLoading: false });
    }
  },

  updateNote: async (id, data) => {
    set({ isUpdating: true });
    try {
      const res = await axiosInstance.put(`/notes/${id}`, data);
      // Update description
      set((state) => ({
        note: state.note
          ? { ...state.note, description: data.description }
          : null,
        notes: state.notes.map((note) =>
          note._id === id ? { ...note, description: data.description } : note
        ),
      }));
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteNote: async (id) => {
    set({ isDeleting: true });
    try {
      const res = await axiosInstance.delete(`/notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id),
      }));
      toast.success(res.data.message);
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    } finally {
      set({ isDeleting: false });
    }
  },
}));
