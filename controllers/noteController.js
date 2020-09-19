const Note = require('../models/note');

exports.add_new_note = (req, res) => {
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
    Note.newNote(newNote, (err, note) => {
        if (err) return err;
        return res.json({
            message: "Post created successfully",
            note
        });
    });
}