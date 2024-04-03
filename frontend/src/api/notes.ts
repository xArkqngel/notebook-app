const API_URL = "http://localhost:3000/api";

export interface NoteType {
  _id: string;
  title: string;
  content?: string;
  isArchived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateNote = Omit<NoteType, "_id" | "createdAt" | "updatedAt">;

export const createNoteRequest = async (note: CreateNote) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const getNotesRequest = async () => {
  const response = await fetch(`${API_URL}/notes`);
  return response.json();
};
