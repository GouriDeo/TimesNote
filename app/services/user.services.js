const User = require('../model/user.model')
var bcrypt = require('bcrypt-nodejs') 

exports.signUp = async function(req,res){
    var userExist = await User.findOne({
        email: req.body.email        
    })

    if(userExist){
        res.send({
            message:'User already exists, try different email id'
        })
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    })

    await bcrypt.hash(req.body.password,bcrypt.genSaltSync(10),null,async function(err,hash){
        if(err){
            throw err
        }
        else{
            user.password = hash
        }

        let userResponse = await User.create(user)

      // tokrnCreation(userResponse);
       res.send({
           status : userResponse.name + 'Registered'
       })
    })

}

exports.getValidUserById = async function(userId){
    var user = User.findOne({
        _id : userId,
        isActive : true,
        isDeleted : false
    })
    return user;
}