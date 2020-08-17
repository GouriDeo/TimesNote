var express = require('express')
const router = express.Router();
expressValidator = require('express-validator')
var userController =require('../controller/user.controller')
router.use(expressValidator())

router.post('/',userController.createUser);
//router.post('/verify',userController.confirmAccount);
router.post('/confirmAccount',userController.verifyAccount);
router.post('/login',userController.login);
router.post('/forgetPassword',userController.forgetPassword);
router.post('/updatePassword',userController.updatePassword);


module.exports = router