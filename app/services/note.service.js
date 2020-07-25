"use strict"
const Note = require('../model/note.model')
const User = require('../model/user.model')

class NoteService{
    constructor(){
                       
    }

    async addNote(req,res){
        try {
            var user = await User.findOne({
                _id: req.body.userId 
            })
            if(user){
                var note = new Note({
                    title : req.body.title,
                    content : req.body.content
                })
                var noteResponse = await Note.create(note)
                res.send(noteResponse)
            }
            else{
                res.send({
                    message : 'Invalid user'
                })
            }

        } catch (error) {
            throw new Error(error)
        }
    }
}
module.exports = NoteService;