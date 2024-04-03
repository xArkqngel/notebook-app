"use client";
import {
  CreateNote,
  NoteType,
  getNotesRequest,
  createNoteRequest,
  deleteNoteRequest,
  updateNoteRequest,
  UpdateNote,
} from "@/api/notes";
import React, { createContext, useEffect, useState } from "react";

interface NotesContextType {
  notes: NoteType[];
  setNotes: () => void;
  getNotes: () => void;
  createNote: (note: CreateNote) => void;
  deleteNote: (id: string) => Promise<void>;
  updateNote: (id:string, note: UpdateNote) => void;
}

export const NoteContext = createContext<NotesContextType>({
  notes: [],
  setNotes: () => {},
  getNotes: () => {},
  createNote: () => {},
  deleteNote: async () => {},
  updateNote: async() => {},
});

interface Props {
  children: React.ReactNode;
}

export const NoteProvider: React.FC<Props> = ({ children }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    getNotesRequest()
      .then((data) => data)
      .then((notes) => setNotes(notes));
  }, []);

  const createNote = async (note: CreateNote) => {
    const res = await createNoteRequest(note);
    const data = await res;
    console.log(data);
    setNotes([...notes, res]);
  };

  const deleteNote = async (id: string) => {
    const response = await deleteNoteRequest(id);
    console.log(response);
    if (response.status === 204) {
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  const updateNote = async (id:string, note: UpdateNote) => {
    const res = await updateNoteRequest(id,note);
    const data = await res.json();
    setNotes(notes.map((note) => note._id === id ? {...note, ...data} : note));
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes: () => {},
        getNotes: () => {},
        createNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
