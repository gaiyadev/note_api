const Note = require("../models/note");

// Add new
exports.add_new_note = async (req, res) => {
  const { title, body } = req.body;
  const { _id } = req.user;

  if (!_id) {
    return res.status(403).json({
      error: "not allowed",
    });
  }

  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  if (!body) {
    return res.status(400).json({
      error: "Body is required",
    });
  }
  const newNote = new Note({
    title: title,
    body: body,
    createdBy: _id,
  });
  await Note.newNote(newNote, (err, note) => {
    if (err) return err;
    return res.json({
      message: "Note created successfully",
      note,
    });
  });
};

// edit note
exports.edit_note = async (req, res) => {
  const id = req.params.noteId;
  const { title, body } = req.body;
  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  if (!body) {
    return res.status(400).json({
      error: "Body is required",
    });
  }

  await Note.findByIdAndUpdate(id)
    .then((note) => {
      if (!note) {
        return res.status(400).json({
          error: "Note not found",
        });
      }
      note.title = title;
      note.body = body;
      note.save();
      return res.json({
        message: "Note updated successfully",
        note,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Note not found",
      });
    });
};

// delete note
exports.delete_note = async (req, res) => {
  const { noteId } = req.params;
  await Note.findByIdAndDelete(noteId)
    .then((note) => {
      if (!note) {
        return res.status(400).json({
          error: "Note not found",
        });
      }
      return res.json({
        message: "Note deleted successfully",
      });
    })
    .catch((err) => {
      return res.json({
        error: err,
      });
    });
};

// all notes fetch

exports.get_all_notes = async (req, res) => {
  await Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      if (!notes) {
        return res.status(400).json({
          message: "Note not found",
        });
      }
      return res.json({
        notes,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Note not found",
      });
    });
};

// get note by id
exports.note_get_one = (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then((item) =>
      res.status(200).json({
        success: true,
        item,
      })
    )
    .catch((err) =>
      res.status(404).json({
        success: false,
        err,
      })
    );
};

// get a user note
exports.get_all_user_notes = async (req, res) => {
  const { _id } = req.user;
  const notes = await Note.find({ createdBy: _id });
  if (!notes) {
    return res.json({ error: "Post not found" });
  }
  return res.status(200).json({
    notes,
  });
};
