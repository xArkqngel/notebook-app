import NoteForm from "@/components/NoteForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold pb-10">Note App</h1>
      <NoteForm />
    </main>
  );
}
