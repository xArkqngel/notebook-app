const API_URL = 'http://localhost:3000';

interface Note {
    title: string;
    content?: string;
    isArchived?: boolean;
    }

export const createNoteRequest = async (note:Note) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
}