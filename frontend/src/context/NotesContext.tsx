"use client"
import { NoteType, getNotesRequest } from "@/api/notes";
import React, { createContext, useEffect, useState } from "react";

interface NotesContextType {
    notes: NoteType[];
    setNotes: () => void;
    getNotes: () => void;
    createNote: () => void;
    deleteNote: () => void;
    updateNote: () => void;
}

export const NoteContext = createContext<NotesContextType>({
    notes: [],
    setNotes: () => {},
    getNotes: () => {},
    createNote: () => {},
    deleteNote: () => {},
    updateNote: () => {},
});

interface Props {
    children: React.ReactNode;
}

export const NoteProvider : React.FC<Props> = ({ children }) => {

    const [notes, setNotes] = useState<NoteType[]>([])

    useEffect(() => {
        getNotesRequest()
            .then((data) => data)
            .then((notes) => setNotes(notes));
    }
    , [])

    return (
        <NoteContext.Provider value={{ notes, setNotes: () => {}, getNotes: () => {}, createNote: () => {}, deleteNote: () => {}, updateNote: () => {} }}>
            {children}
        </NoteContext.Provider>
    );
}
