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
                let text = "To verify the account please on the link given: \n http://localhost:4200/verify/"+token.token
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

 exports.verifyAccount = async function(req,res){
    try{
        var tokenDetail = await Token.findOne({
            token:req.body.token
        })
        if(!tokenDetail){
            return res.status(400).send({
                message:"Invalid token or your token might be expired."
            })
        }
        var userDetail = await User.findOne({
            _id:tokenDetail.userId,
            email:req.body.email
        })
        if(!userDetail){
            return res.status(401).send({
                message:'User does not exists, may be account is deleted'
            })
        }
        if(userDetail.isVerified){
            return res.status(400).send({
                message:"Account is alredy verified."
           })
        }
        userDetail.isVerified=true;
        userDetail.save(function (err) {
            if (err) {
                return res.status(500).send({ 
                    msg: err.message 
                });
            }
            res.status(200).send({
                message:'Account has been verified please login.'
            });
        })
    }catch(err){
        res.send(err)
    }
}
