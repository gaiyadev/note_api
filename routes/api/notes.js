const NoteController = require("../../controllers/noteController");
const auth = require("../../middleware/auth");

var express = require("express");
var router = express.Router();

/*  @route     POST /api/notes/add
    @desc      Add a new note
    @access    Private 
    */
router.post("/add", auth, NoteController.add_new_note);

/*  @route     PUT /api/notes/dsdw435
    @desc      Add a new note
    @access    Private 
    */
router.put("/:noteId", auth, NoteController.edit_note);
/*  @route     Delete /api/notes/45trr
    @desc      Add a new note
    @access    Private 
    */

router.delete("/:noteId", auth, NoteController.delete_note);

/*  @route     Get /api/notes/
    @desc      Add a new note
    @access    Private 
    */
router.get("/", auth, NoteController.get_all_notes);

/*  @route     Get /api/notes/45te5tgre
    @desc      Add a new note
    @access    Private
    */
router.get("/:id", auth, NoteController.note_get_one);

module.exports = router;
