const express = require("express");
const router = express.Router();
const auth = require("../../config/ensureLoggedIn");
const noteCtrl = require("../../controllers/api/notes");

router.post("/create", auth, noteCtrl.create)
router.get('/', auth, noteCtrl.getNotes)
router.get('/:id', auth, noteCtrl.getSingleNote)
router.delete('/:id', auth, noteCtrl.delete)

module.exports = router