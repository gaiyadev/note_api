const auth = require('../../middleware/auth');
const NoteController = require('../../controllers/postController');
var express = require('express');
var router = express.Router();



/*  @route     POST /api/notes/add
    @desc      Add a new note
    @access    Private 
    */

router.post('/add', auth, NoteController.add_new_post);


module.exports = router;
