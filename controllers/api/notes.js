const Note = require('../../models/notes')

module.exports = {
    create,
    getNotes,
    delete: deleteNote
  };

async function create (req,res) {
    console.log(req.body)
    req.body.owner = req.user._id
    const note = new Note(req.body)
    try {
        await note.save()
        res.status(201).send({
            note, message: "Note Saved"
        })
    } catch (e) {
        res.status(500).send(e)
    } 
}

async function getNotes(req, res) {
  const notes = await Note.find({owner:req.user._id})
  res.json(notes)
}

async function deleteNote(req, res) {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id})
        res.json(note)
    } catch (e) {
        res.status(500).send(e)
    }
}