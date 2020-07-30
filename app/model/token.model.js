var mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    token : {
        type : String,
        required : true,
        default : Date.now,
        expires : 432000
    }
});

module.exports = mongoose.model('Token',tokenSchema)