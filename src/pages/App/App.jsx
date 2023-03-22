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
  
  useEffect(() => {
    async function getAllNotes() {
      const allNotes = await notesApi.getAll();
      setNotes(allNotes);
    }
    getAllNotes();
  }, []);

  const handleNoteSubmit = async (noteContent) => {
    console.log(noteContent)
    const newNote = await notesApi.createNote(noteContent);
    setNotes([...notes, newNote.note]);
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <div>
            <NewNoteForm
              user={user}
              handleNoteSubmit={handleNoteSubmit}
            />
            {notes.length === 0 ? (
              <p>No notes yet!</p>
            ) : (
              notes.map((note, idx) => (
                <p key={idx}>
                  {note.content}
                </p>
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
