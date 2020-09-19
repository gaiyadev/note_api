const NoteController = require('../../controllers/noteController');
var express = require('express');
var router = express.Router();



/*  @route     POST /api/notes/add
    @desc      Add a new note
    @access    Private 
    */

router.post('/add', NoteController.add_new_note);


module.exports = router;
