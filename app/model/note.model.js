const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const NoteSchema = mongoose.Schema(
    {
        title: {
            type : String,
            require : true,
            max : 20
        },
        content: { 
            type: String, 
            unique: true 
        },
        userId:  {
            type : Schema.Types.ObjectId, ref : 'User'
        }
        
    },{
        timestamp : true
    }     
)
module.exports = mongoose.model('Note',NoteSchema);