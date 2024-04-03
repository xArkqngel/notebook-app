'use client'
import { NoteType, getNotesRequest } from "@/api/notes";
import { useEffect, useState } from "react";
import Note from "./Note";
import { useNotes } from "@/context/useNotes";


function NoteList() {

  const {notes} = useNotes();
  
  return (
    <div className="grid grid-flow-row grid-cols-7">
      {notes.map((note) => (
        <div key={note._id}>
          <Note note={note} />
        </div>
      ))}
    </div>
  );
}

export default NoteList;