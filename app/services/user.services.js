const User = require('../model/user.model')
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var eventEmitter = require('../../events/events') 
var Token = require('../model/token.model')

exports.signUp = async function(req,res,next){
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

        var token = await new Token({
            userId: userResponse._id,
            token: crypto.randomBytes(16).toString('hex')
        })
        console.log(token);
        await token.save(async function(err){
            if(err){
                return res.status(500).send({
                    message: err.message
                })
            }
            else{
                let subject = 'account verification token'
                let text = token.token
                eventEmitter.emit('sendEmail',subject,user,text)
                
            }
        })
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