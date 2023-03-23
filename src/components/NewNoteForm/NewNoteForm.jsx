import { useState } from 'react';



export default function NewNoteForm({ handleNoteSubmit }) {
  const [noteText, setNoteText] = useState({content:""});


  const handleChange = async (event) => {
    const note = {...noteText, [event.target.name]:event.target.value}
    setNoteText(note)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleNoteSubmit(noteText)
/*const newNote = await notesApi.createNote({
      content: noteText.content,
      owner: user._id
    });
    setNotes([...notes, newNote]);
    setNoteText({ content: "" });*/
  };

  

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
