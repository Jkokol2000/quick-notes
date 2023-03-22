import { useState } from 'react';

export default function NewNoteForm({ user }) {
  const [noteText, setNoteText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newNote = { text: noteText, user: user._id }; // add user ID to note data
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });
    const data = await response.json();
    console.log('New note:', data);
    // clear the input field
    setNoteText('');
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter note text"
        value={noteText}
        onChange={(event) => setNoteText(event.target.value)}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
