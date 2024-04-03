import { useState } from "react"; // Import useState hook
import { NoteType } from "@/api/notes";
import { useNotes } from "@/context/useNotes";
import Image from "next/image";

function Note({ note }: { note: NoteType }) {
  const { deleteNote, updateNote } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [editedTags, setEditedTags] = useState<string[]>(note.tags || []);

  const handleUpdateNote = () => {
    updateNote(note._id, {
      title: editedTitle,
      content: editedContent,
      tags: editedTags,
    });
    setIsEditing(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTags(editedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-1 p-4 bg-amber-200 m-1">
      <div className="flex flex-row justify-between  gap-10">
        {isEditing ? (
          <>
            <input
              className="text-black"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </>
        ) : (
          <>
            <h2 className="text-lg text-black font-semibold">{note.title}</h2>
            <div className="flex flex-row gap-1 items-start">
              <button
                onClick={() =>
                  updateNote(note._id, { isArchived: !note.isArchived })
                }
              >
                <Image
                  src={`/archive.svg`}
                  alt="archive"
                  width={21}
                  height={20}
                />
              </button>
              <button onClick={() => setIsEditing(true)}>
                <Image src={`/edit.svg`} alt="edit" width={21} height={20} />
              </button>
              <button
                onClick={async () => {
                  if (
                    window.confirm("Are you sure you want to delete this note?")
                  ) {
                    deleteNote(note._id);
                  }
                }}
              >
                <Image
                  src={`/delete.svg`}
                  alt="delete"
                  width={18}
                  height={20}
                />
              </button>
            </div>
          </>
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            value={editedContent}
            className="text-black"
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </div>
      ) : (
        <p className="text-sm text-black">{note.content}</p>
      )}
      <div className="flex flex-wrap gap-1">
        {editedTags.map((tag) => (
          <div
            key={tag}
            className="bg-orange-400 rounded-lg px-2 text-sm flex items-center"
          >
            <span>{tag}</span>
            {isEditing && (
              <button className="ml-1" onClick={() => handleRemoveTag(tag)}>
                <Image src={`/xmark.svg`} alt="remove" width={14} height={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="flex flex-row gap-1 items-start justify-end text-black">
          <button onClick={handleUpdateNote}>
            <Image src={`/check.svg`} alt="save" width={21} height={20} />
          </button>
          <button onClick={() => setIsEditing(false)}>
            <Image src={`/xmark.svg`} alt="close" width={21} height={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Note;
