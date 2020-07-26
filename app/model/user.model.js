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
        password:{
            type : String,
            require : true
        },
        isVerified: { 
            type: Boolean, 
            default: false 
        },
        isActive : {
            type : Boolean,
            default : true
        },
        isDeleted : {
            type : Boolean,
            default : false
        }
    },{
        timestamps : true
    }     
)
module.exports = mongoose.model('User',UserSchema);