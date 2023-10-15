const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated

const noteSchema = mongoose.Schema({
    noteTitle: {
        type: String,
        require: true
    },
    noteDescription: {
        type: String,
        require: true
    },
    priority: {
        type: String,
        enum: ["HIGH", "LOW", "MEDIUM"]
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: Date
})

module.exports = mongoose.model("note", noteSchema)