import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NotesPage from '../NotesPage/NotesPage';
import NavBar from '../../components/NavBar/NavBar';
import * as notesApi from '../../utilities/notes-api'



export default function App() {
  const [user, setUser] = useState(getUser());
  const [notes, setNotes] = useState([])
  useEffect(() => {
    async function getAllNotes(){
      const allNotes = await notesApi.getAll()
      setNotes(allNotes)
    }
    getAllNotes()
  }, [])
  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/notes" element={<NotesPage notes={notes} userId={user} setNotes={setNotes}/>} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}