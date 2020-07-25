const mongoose =require('mongoose')
const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
    {
        name: {
            type : String,
            require : true,
            max : 20
        },
        email: { 
            type: String, 
            unique: true 
        },
        isVerified: { 
            type: Boolean, 
            default: false 
        },
        password:{
            type : String,
            require : true
        }
    },{
        timestamp : true
    }     
)
module.exports = mongoose.model('User',UserSchema);