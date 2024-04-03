'use client'
import React, { useState } from 'react';
import { useNotes } from '@/context/useNotes';

export const Tags = [
    'work',
    'personal',
    'school',
    'todo',
    'shopping',
    'ideas',
    'important',
    'other',
];

function NoteForm(){

    const [note, setNote] = useState({
        title: '',
        content: '',
        isArchived: false,
        tags: [""],
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const {createNote } = useNotes();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tag = e.target.value;
        const checked = e.target.checked;
        
        if (checked) {
            setSelectedCategories([...selectedCategories, tag]);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== tag));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createNote({
            ...note,
            tags: selectedCategories, // Update note with selected tags
        });

        // Print the selected tags
        console.log(selectedCategories);
    }
    
    return (
        <div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder="Title" className="border-2 border-slate-400 p-2 rounded-lg bg-zinc-700 block w-full my-2" onChange={handleChange}/>
                <textarea placeholder="Content" name='content' className="border-2 border-slate-400 p-2 rounded-lg bg-zinc-700 block w-full my-2" onChange={handleChange}></textarea>
                <div>
                    {Tags.map((tag) => (
                        <label key={tag} className="mr-2">
                            <input type="checkbox" name="tags" value={tag} onChange={handleTagChange} />
                            {tag}
                        </label>
                    ))}
                </div>
                <button type="submit" className="bg-orange-400 px-3 block py-2 w-full" >Add Note</button>
            </form>
        </div>
    )
}

export default NoteForm;