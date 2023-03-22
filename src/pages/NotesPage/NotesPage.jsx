import NewNoteForm from "../../components/NewNoteForm/NewNoteForm";

export default function NotesPage({notes, userId, setNotes}) {
  console.log(userId)
  const userNotes = notes.filter(note => note.owner === userId._id);
  if (userNotes.length === 0) {
    return <p>No notes yet!</p>
  }

  return (
    <div>
      <NewNoteForm notes={notes} user={userId} setNotes = {setNotes} />
      {userNotes.map((note, idx) => (
        <p key={idx}>{note.content} - {note.createdAt.toLocaleString()}</p>
      ))}
    </div>
  )
}
