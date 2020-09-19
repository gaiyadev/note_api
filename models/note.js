const mongoose = require('mongoose');
require('../database/db');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },

});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;

module.exports.newNote = (newNote, callback) => {
    newNote.save(callback); //create New User

}







