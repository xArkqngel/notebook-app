const API_URL = "http://localhost:3000/api";

export interface NoteType {
  _id: string;
  title: string;
  content?: string;
  isArchived?: boolean;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type CreateNote = Omit<NoteType, "_id" | "createdAt" | "updatedAt">;
export type UpdateNote = Partial<CreateNote>;

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

export const deleteNoteRequest = async (id: string) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return response;
}

export const updateNoteRequest = async (id:string,note: UpdateNote) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response;
};
