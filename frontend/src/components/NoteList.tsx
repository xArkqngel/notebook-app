'use client'
import { NoteType, getNotesRequest } from "@/api/notes";
import { useEffect, useState } from "react";
import Note from "./Note";
import { useNotes } from "@/context/useNotes";


function NoteList() {

  const {notes} = useNotes();
  const [showArchived, setShowArchived] = useState(false);
  
  return (
    <div className="flex flex-col pt-10">
      <div className="flex flex-row justify-start gap-2">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <button onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "Show Notes" : "Show Archived"}
        </button>
      </div>
      <div className="grid grid-flow-row grid-cols-7">
        {!showArchived ? (
          notes.filter((note) => !note.isArchived).map((note) => (
            <Note key={note._id} note={note} />
          ))
        ) : (
          notes.filter((note) => note.isArchived).map((note) => (
            <Note key={note._id} note={note} />
          ))
        )}
      </div>
    </div>
  );
}

export default NoteList;