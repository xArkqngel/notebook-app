"use client";
import { useEffect, useState } from "react";
import Note from "./Note";
import { useNotes } from "@/context/useNotes";

function NoteList() {
  const { notes } = useNotes();
  const [showArchived, setShowArchived] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.tags.includes(selectedCategory))
    : notes;

  return (
    <div className="flex flex-col pt-10">
      <div className="flex flex-row justify-between items-start gap-2">
        <div className="flex flex-row gap-4">
          <h1 className="text-2xl font-semibold">Notes</h1>
          <button onClick={() => setShowArchived(!showArchived)}>
            {showArchived ? "Show Notes" : "Show Archived"}
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <select
            value={selectedCategory}
            className="text-black"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-7">
        {!showArchived
          ? filteredNotes
              .filter((note) => !note.isArchived)
              .map((note) => <Note key={note._id} note={note} />)
          : filteredNotes
              .filter((note) => note.isArchived)
              .map((note) => <Note key={note._id} note={note} />)}
      </div>
    </div>
  );
}

export default NoteList;
