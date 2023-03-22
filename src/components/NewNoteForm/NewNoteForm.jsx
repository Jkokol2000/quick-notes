import { useState } from 'react';
import * as notesApi from "../../utilities/notes-api"



export default function NewNoteForm({ user, notes, setNotes }) {
  const [noteText, setNoteText] = useState({content:""});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newNote = await notesApi.createNote({
      content: noteText.content,
      owner: user._id
    });
    setNotes([...notes, newNote]);
    setNoteText({ content: "" });
  };

  const handleChange = async (event) => {
    const note = {...noteText, [event.target.name]:event.target.value}
    setNoteText(note)
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        name = "content"
        type="text"
        placeholder="Enter note text"
        value={noteText.content || ""}
        onChange={handleChange}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
