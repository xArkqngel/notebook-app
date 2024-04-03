import { NoteType } from "@/api/notes";

function Note({ note }: { note: NoteType }) {
  return (
    <div className="flex flex-col gap-1 p-4 bg-amber-200 m-1">
      <div className="flex flex-row justify-between">
        <h2 className="text-lg text-black font-semibold">{note.title}</h2>
        <button>
            archive
        </button>
      </div>
      <p className="text-sm text-black">{note.content}</p>
    </div>
  );
}

export default Note;
