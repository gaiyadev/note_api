const mongoose = require("mongoose");
require("../database/db");
const { ObjectId } = mongoose.Schema.Types;

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;

module.exports.newNote = (newNote, callback) => {
  newNote.save(callback); //create New User
};
