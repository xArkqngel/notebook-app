'use client'
import React, { useState } from 'react';
import { createNoteRequest } from '@/api/notes';

function NoteForm(){

    const [note, setNote] = useState({
        title: '',
        content: '',
        isArchived: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(note);
        const res = await createNoteRequest(note);
        const data = await res;
        console.log(data);
    }
    
    return (
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder="Title" className="border-2 border-slate-400 p-2 rounded-lg bg-zinc-700 block w-full my-2" onChange={handleChange}/>
                <textarea placeholder="Content" name='content' className="border-2 border-slate-400 p-2 rounded-lg bg-zinc-700 block w-full my-2" onChange={handleChange}></textarea>
                <button type="submit" className="bg-green-400 px-3 block py-2 w-full" >Add Note</button>
            </form>
        </div>
    )
}

export default NoteForm;