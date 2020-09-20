const { findOne } = require('../models/note');
const Note = require('../models/note');

exports.add_new_note = async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({
            error: 'Please all fields are required'
        });

    }
    const newNote = new Note({
        title: title,
        body: body,
    });
    await Note.newNote(newNote, (err, note) => {
        if (err) return err;
        return res.json({
            message: "Note created successfully",
            note
        });
    });
}


exports.edit_note = async (req, res) => {
    const id = req.params.noteId;
    const { title, body } = req.body;
    await Note.findByIdAndUpdate(id).then(note => {
        if (!note) {
            return res.status(400).json({
                error: "Note not found",
            });
        }
        note.title = title;
        note.body = body;
        note.save();
        return res.json({
            message: "Note deleted successfully",
            note
        });
    }).catch(err => {
        return res.status(400).json({
            error: "Note not found",
        });
    })




}
exports.delete_note = async (req, res) => {
    const id = req.params.noteId;
    await Note.findByIdAndDelete(id).then(note => {
        if (!note) {
            return res.status(400).json({
                error: "Note not found",
            });
        }
        return res.json({
            message: "Note deleted successfully",
            note
        });
    }).catch(err => {
        return res.json({
            error: err,
        });
    })
}


exports.get_all_notes = async (req, res) => {
    await Note.find().then(notes => {
        if (!notes) {
            return res.status(400).json({
                message: "Note not found",
            });
        }
        return res.json({
            notes
        });
    }).catch(err => {
        return res.status(400).json({
            message: "Note not found",
        });
    });
}


exports.note_get_one = (req, res) => {
    Note.findById(req.params.id)
        .then(item => res.status(200).json({
            success: true,
            item
        })).
        catch(err => res.status(404).json({
            success: false,
            err
        }))
}
