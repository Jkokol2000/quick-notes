import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import NewNoteForm from "../../components/NewNoteForm/NewNoteForm";
import * as notesApi from '../../utilities/notes-api';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([]);
  const [sortBy, setSortBy] = useState('desc')
  
  useEffect(() => {
    async function getAllNotes() {
      const allNotes = await notesApi.getAll();
      setNotes(allNotes);
    }
    if(user){
      getAllNotes();
    } 
  }, [user]);

  const handleNoteSubmit = async (noteContent) => {
    const newNote = await notesApi.createNote(noteContent);
    setNotes([...notes, newNote.note]);
  };

  const sortedNotes = [...notes].sort((a,b) => {
    if (sortBy === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  })

async function deleteNote(note) {
  const deletedNote = await notesApi.deleteNote(note)
  const updatedNotes = notes.filter((n) => n._id !== deletedNote._id)
  setNotes(updatedNotes)
}

  const handleSortToggle = () => {
    if (sortBy === 'asc') {
      setSortBy('desc');
    } else {
      setSortBy('asc')
    }
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} notes={notes} setUser={setUser} />
          <div>
          <button onClick={handleSortToggle}>Toggle Sort Order</button>
            <NewNoteForm
              user={user}
              handleNoteSubmit={handleNoteSubmit}
            />
            {notes.length === 0 ? (
              <p>No notes yet!</p>
            ) : (
              sortedNotes.map((note, idx) => (
                <div key={idx}>
                <p>
                  {note.content} - {note.createdAt} - <button onClick={() => deleteNote(note._id)}>Delete</button>
                </p>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
