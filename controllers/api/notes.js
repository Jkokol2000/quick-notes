const Note = require('../../models/notes')

module.exports = {
    create,
    getNotes,
    getSingleNote,
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

async function getSingleNote(req, res) {
    try {
        const note = await Note.findById({ _id: req.params.id})
        if(!note){
            return res.status(404).send()
        }
        res.sen(note)
    } catch(e){
        res.status(500), send(e);
    }
}

async function deleteNote(req, res) {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id})
        
        if(!note) {
            return res.status(404).send()
        }

        res.send({message: "Note was deleted"})
    } catch (e) {
        res.status(500).send(e)
    }
}