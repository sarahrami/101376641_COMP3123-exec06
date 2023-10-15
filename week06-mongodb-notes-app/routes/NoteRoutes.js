const express = require("express");
const noteModel = require('../models/NotesModel');
const app = express()
const mongoose = require('mongoose');

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
app.post('/notes', async (req, res) => {
    // Validate request
   try{
        if(!req.body.noteTitle || !req.body.noteDescription) {
            return res.status(400).send({
                message: "Note title and description can not be empty"
            });
        }
        //TODO - Write your code here to save the note
        const newNote = new noteModel({...req.body})
        await newNote.save()
        return res.status(201).send({message: "Note has been created"})

   }catch(error){
        return res.status(500).send({error: error.message})
   }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    // Validate request
    try{
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Note content can not be empty"
        //     });
        // }
        //TODO - Write your code here to returns all note
        const notes = await noteModel.find({})
        return res.status(201).send({status: "successfully retrieved", notes: notes})

    }catch(error){
        return res.status(500).send({error: error.message})
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Validate request
   try{
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Note content can not be empty"
        //     });
        // }
        //TODO - Write your code here to return only one note using noteid
        const noteById = await noteModel.findById({_id: req.params.noteId})
        return res.status(201).send({status: "successfully retrieved", note: noteById})

   }catch(error){
        return res.status(500).send({error: error.message})
   }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    try{
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Note content can not be empty"
        //     });
        // }
        //TODO - Write your code here to update the note using noteid
        const note = await noteModel.findByIdAndUpdate(req.params.noteId,req.body, {new: true})
        if(!note){
            return res.status(400).send({
                message: "Note not found"
            });
        }else{
            return res.status(201).send({
                message: "Note has been updated", 
                newNote: note
            })
        }
    
       }catch(error){
            return res.status(500).send({error: error.message})
       }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    try{
        // if(!req.body.content) {
        //     return res.status(400).send({
        //         message: "Note content can not be empty"
        //     });
        // }
        //TODO - Write your code here to delete the note using noteid
        const note = await noteModel.findByIdAndDelete({_id: req.params.noteId})

        return res.status(201).send({message: "Note Deleted."})

    }catch(error){
        return res.status(500).send({error: error.message})
    }
});

module.exports = app
